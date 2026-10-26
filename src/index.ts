import { TetrisQuiz } from './lib/TetrisQuiz';
import { type Action, keybinds } from './lib/Keybind';
import { PCSIZE, BOARDHEIGHT } from './lib/constants';
import { CELL_SIZE, drawGame, drawQueue, drawHold, drawOOF } from './render';

const gameCtn = document.querySelector<HTMLDivElement>('#game-container');
const boardCanvas = document.querySelector<HTMLCanvasElement>('#board');
const queueCanvas = document.querySelector<HTMLCanvasElement>('#queue');
const holdCanvas = document.querySelector<HTMLCanvasElement>('#hold');

if (!gameCtn || !boardCanvas || !queueCanvas || !holdCanvas) {
  throw new Error('Required HTML elements are missing');
}

let actions: Set<Action> = new Set<Action>();
let showAnswer = false;

// get values from python
const controls = window.config.controls;
const tuning = window.config.tuning;
const parameters = window.parameters;
const cardSide = window.ankiCardSide;

const boardCtx = boardCanvas.getContext('2d')!;
const queueCtx = queueCanvas.getContext('2d')!;
const holdCtx = holdCanvas.getContext('2d')!;

initCanvas();
initContext();

gameCtn.addEventListener('keydown', handleKeyDown);
gameCtn.addEventListener('keyup', handleKeyUp);

keybinds.reset(controls);

const game = new TetrisQuiz(
  parameters.pattern,
  parameters.initialFumen,
  parameters.targetFumens,
  parameters.coverMask ? parameters.coverMask : null,
  parameters.fillBag
);
game.reset(false);
game.loadHandling(tuning);

const saved = sessionStorage.getItem('tetris-state');
if (saved) {
  showAnswer = true;
  game.restore(JSON.parse(saved));
  sessionStorage.removeItem('tetris-state');
}
if (cardSide == 'back') {
  showAnswer = !game.answered;
}

// game starts as focus
requestAnimationFrame(() => {
  focusGame();
});

// start loop
requestAnimationFrame(loop);

function loop(timestamp: number) {
  game.tick(timestamp, actions);
  const tmpActions = new Set<Action>();
  if (actions.has('left')) tmpActions.add('left');
  if (actions.has('right')) tmpActions.add('right');
  if (actions.has('sd')) tmpActions.add('sd');
  actions = tmpActions;

  handleEvents();

  drawGame(boardCtx, game, showAnswer);
  drawQueue(queueCtx, game.queue);
  drawHold(holdCtx, game.holdPiece);
  if (document.activeElement !== gameCtn) {
    drawOOF(boardCtx);
  }
  requestAnimationFrame(loop);
}

function focusGame(): void {
  gameCtn?.focus();
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.code == 'KeyZ' && event.ctrlKey) {
    actions.add('undo');
  } else actions.add(keybinds.lookup[event.code]);
}

function handleKeyUp(event: KeyboardEvent) {
  actions.delete(keybinds.lookup[event.code]);
}

function handleEvents() {
  for (const event of game.pendingEvents) {
    switch (event) {
      case 'reset':
        showAnswer = cardSide == 'back';
        break;
      case 'correct':
        showAnswer = false;
        if (cardSide == 'front') {
          const state = game.save();

          sessionStorage.setItem('tetris-state', JSON.stringify(state));
          pycmd('tetris:answer');
        }
        break;
      case 'wrong':
        break;
    }
  }
  game.pendingEvents = [];
}

function initCanvas() {
  if (!boardCanvas || !queueCanvas || !holdCanvas) {
    throw new Error('Required HTML elements are missing');
  }
  boardCanvas.width = PCSIZE * CELL_SIZE;
  boardCanvas.height = BOARDHEIGHT * CELL_SIZE;
  queueCanvas.width = 4 * CELL_SIZE;
  queueCanvas.height = 14 * CELL_SIZE;
  holdCanvas.width = 4 * CELL_SIZE;
  holdCanvas.height = 2 * CELL_SIZE;
}

function initContext() {
  // Set origin to bottom left
  holdCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 2 * CELL_SIZE);
  boardCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 20 * CELL_SIZE);
  queueCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 14 * CELL_SIZE);
}
