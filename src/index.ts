import { TetrisBoardPiece } from './lib/TetrisBoardPiece';
import { get_colour, PieceEnum, Rotation } from './lib/pieceData';
import { TetrisQueue } from './lib/TetrisQueue';
import { TetrisBoard } from './lib/TetrisBoard';
import { TetrisQuiz } from './lib/TetrisQuiz';
import { type Action, keybinds } from './lib/Keybind';
import { PCSIZE, BOARDHEIGHT } from './lib/constants';
import { Fumen, Mino } from './lib/types';
import { decodeWrapper } from './lib/fumenUtils';

const gameCtn = document.querySelector<HTMLDivElement>('#game-container');
const boardCanvas = document.querySelector<HTMLCanvasElement>('#board');
const queueCanvas = document.querySelector<HTMLCanvasElement>('#queue');
const holdCanvas = document.querySelector<HTMLCanvasElement>('#hold');

if (!gameCtn || !boardCanvas || !queueCanvas || !holdCanvas) {
  throw new Error('Required HTML elements are missing');
}

let actions: Set<Action> = new Set<Action>();
let showAnswer = false;

const CELL_SIZE = 24;

const controls = window.config.controls;
const tuning = window.config.tuning;
keybinds.reset(controls);

const parameters = window.parameters;
const cardSide = window.ankiCardSide;

boardCanvas.width = PCSIZE * CELL_SIZE;
boardCanvas.height = BOARDHEIGHT * CELL_SIZE;
queueCanvas.width = 4 * CELL_SIZE;
queueCanvas.height = 14 * CELL_SIZE;
holdCanvas.width = 4 * CELL_SIZE;
holdCanvas.height = 2 * CELL_SIZE;

const boardCtx = boardCanvas.getContext('2d')!;
const queueCtx = queueCanvas.getContext('2d')!;
const holdCtx = holdCanvas.getContext('2d')!;

// Set origin to bottom left
holdCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 2 * CELL_SIZE);
boardCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 20 * CELL_SIZE);
queueCtx.setTransform(CELL_SIZE, 0, 0, -CELL_SIZE, 0, 14 * CELL_SIZE);

gameCtn.addEventListener('keydown', handleKeyDown);
gameCtn.addEventListener('keyup', handleKeyUp);

const game = new TetrisQuiz(
  parameters.pattern,
  parameters.initialFumen,
  parameters.targetFumen,
  null,
  parameters.fillBag == 'T'
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

const loop = (timestamp: number) => {
  game.tick(timestamp, actions);
  const tmpActions = new Set<Action>();
  if (actions.has('left')) tmpActions.add('left');
  if (actions.has('right')) tmpActions.add('right');
  if (actions.has('sd')) tmpActions.add('sd');
  actions = tmpActions;

  handleEvents();

  drawGame(boardCtx, game);
  drawQueue(queueCtx, game.queue);
  drawHold(holdCtx, game.holdPiece);
  requestAnimationFrame(loop);
};

// game starts as focus
requestAnimationFrame(() => {
  focusGame();
});

// start loop
requestAnimationFrame(loop);

function focusGame(): void {
  gameCtn?.focus();
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.code == 'KeyZ' && event.ctrlKey) {
    actions.add('undo');
  } else actions.add(keybinds.lookup[event.code]);
  // You can also stop scrolling with space/arrows here
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
    event.preventDefault();
  }
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
      case 'missing setup':
        break;
    }
  }
  game.pendingEvents = [];
}

function drawGame(context: CanvasRenderingContext2D, game: TetrisQuiz) {
  drawBoard(context, game.board);
  drawPiece(context, game.active);

  if (showAnswer && game.runningTargetFumen !== null) {
    drawFumen(context, game.runningTargetFumen, '4D', game.board);
  }

  // Ghost
  drawPiece(context, game.getGhost(), '4D');
}

function drawBoard(context: CanvasRenderingContext2D, board: TetrisBoard) {
  context.fillStyle = get_colour(0);
  context.fillRect(0, 0, PCSIZE, BOARDHEIGHT);

  // Grid
  context.beginPath();
  for (let x = 1; x < PCSIZE; x++) {
    context.moveTo(x, 0);
    context.lineTo(x, 20);
  }
  for (let y = 1; y < BOARDHEIGHT; y++) {
    context.moveTo(0, y);
    context.lineTo(10, y);
  }
  const transform = context.getTransform();
  context.resetTransform();
  context.strokeStyle = '#ffffff0E';
  context.lineWidth = 1;
  context.stroke();
  context.setTransform(transform);

  // Minos
  for (let y = 0; y < BOARDHEIGHT; y++) {
    for (let x = 0; x < PCSIZE; x++) {
      if (board.isFilled(y, x)) {
        context.fillStyle = get_colour(board.at(y, x));
        context.fillRect(x, y, 1, 1);
      }
    }
  }

  if (document.activeElement !== gameCtn) {
    drawOOF(context);
  }
}

function drawQueue(context: CanvasRenderingContext2D, queue: TetrisQueue) {
  context.fillStyle = get_colour(PieceEnum._);
  context.fillRect(0, 0, 4, 14);
  const preview = queue.preview();
  for (let i = 0; i < Math.min(preview.length, 5); i++) {
    let shiftX = 0;
    let shiftY = 0;
    if (preview[i] != PieceEnum.I && preview[i] != PieceEnum.O) {
      shiftX = 0.5;
    }
    if (preview[i] == PieceEnum.I) {
      shiftY = 0.5;
    }
    drawPiece(
      context,
      new TetrisBoardPiece(1 + shiftX, 12 - 3 * i + shiftY, preview[i], Rotation.spawn)
    );
  }
}

function drawHold(context: CanvasRenderingContext2D, hold: PieceEnum) {
  context.fillStyle = get_colour(PieceEnum._);
  context.fillRect(0, 0, 4, 2);

  if (hold != PieceEnum._) {
    let shiftX = 0;
    let shiftY = 0;
    if (hold != PieceEnum.I && hold != PieceEnum.O) {
      shiftX = 0.5;
    }
    if (hold == PieceEnum.I) {
      shiftY = 0.5;
    }

    context.fillStyle = get_colour(hold);
    drawPiece(context, new TetrisBoardPiece(1 + shiftX, shiftY, hold, Rotation.spawn));
  }
}

function drawPiece(
  context: CanvasRenderingContext2D,
  piece: TetrisBoardPiece,
  opacity: string = ''
) {
  if (piece.type === PieceEnum._) return;
  if (opacity === undefined) {
    opacity = '';
  }
  for (const { x, y } of piece.getMinos()) {
    context.fillStyle = get_colour(piece.type) + opacity;
    context.fillRect(x, y, 1, 1);
  }
}

function drawFumen(
  context: CanvasRenderingContext2D,
  fumen: Fumen,
  opacity: string = '',
  board: TetrisBoard
) {
  const page = decodeWrapper(fumen)[0];
  const field = page.field.str({ reduced: true, garbage: false }).split('\n').toReversed();
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < PCSIZE; col++) {
      if (board.isFilled(row, col) || field[row][col] === '_') {
        continue;
      }
      const cell = field[row][col];
      const index = PieceEnum[cell as Mino];

      context.fillStyle = get_colour(index) + opacity;
      context.fillRect(col, row, 1, 1);
    }
  }
}

function drawOOF(context: CanvasRenderingContext2D) {
  const transform = context.getTransform();
  context.resetTransform();
  context.font = `bold ${CELL_SIZE + 5}px Arial`;
  context.fillStyle = 'rgba(235, 203, 139, 0.7)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('OUT OF FOCUS', context.canvas.width / 2, context.canvas.height / 2);
  context.setTransform(transform);
}
