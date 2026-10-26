import { TetrisQuiz } from './lib/TetrisQuiz';
import { TetrisBoardPiece } from './lib/TetrisBoardPiece';
import { get_colour, PieceEnum, Rotation } from './lib/pieceData';
import { TetrisQueue } from './lib/TetrisQueue';
import { TetrisBoard } from './lib/TetrisBoard';
import { Fumen, Mino } from './lib/types';
import { decodeWrapper } from './lib/fumenUtils';
import { PCSIZE, BOARDHEIGHT } from './lib/constants';

export const CELL_SIZE = 24;

export function drawGame(context: CanvasRenderingContext2D, game: TetrisQuiz, showAnswer: boolean) {
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
}

export function drawQueue(context: CanvasRenderingContext2D, queue: TetrisQueue) {
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

export function drawHold(context: CanvasRenderingContext2D, hold: PieceEnum) {
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
  const fieldStr = page.field.str({ reduced: true, garbage: false });
  let field: string[] = [];
  if (fieldStr) field = fieldStr.split('\n').toReversed();
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

export function drawOOF(context: CanvasRenderingContext2D) {
  const transform = context.getTransform();
  context.resetTransform();
  context.font = `bold ${CELL_SIZE + 5}px Arial`;
  context.fillStyle = 'rgba(235, 203, 139, 0.7)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('OUT OF FOCUS', context.canvas.width / 2, context.canvas.height / 2);
  context.setTransform(transform);
}
