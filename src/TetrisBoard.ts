import { TetrisBoardPiece } from './TetrisBoardPiece';
import { PieceEnum } from './pieceData';
import { encoder, Field } from 'tetris-fumen';
import type { Fumen, Mino } from './types';
import { decodeWrapper } from './fumenUtils';

export class TetrisBoard {
  public width: number;
  public height: number;
  private board: PieceEnum[][] = new Array<number[]>();

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // initialize board with all 0
    this.reset();
  }

  /**
   * Check if given row is full
   */
  lineFull(row: number): boolean {
    if (row < 0 || row >= this.height) {
      throw new RangeError(`Given row out of bounds of 0-${this.height}`);
    }

    return this.board[row].every((cell) => cell != PieceEnum._);
  }

  /**
   * Clears a row, doesn't check if filled
   */
  lineclear(row: number): void {
    if (row < 0 || row >= this.height) {
      throw new RangeError(`Given row out of bounds of 0-${this.height}`);
    }

    this.board[this.height - 1] = new Array(this.width).fill(PieceEnum._);
    for (let i = row; i < this.height - 1; i++) {
      this.board[i] = this.board[i + 1];
    }
  }

  at(row: number, col: number): number {
    if (row < 0 || row >= this.height) {
      throw new RangeError(`Given row out of bounds of 0-${this.height}`);
    }
    if (col < 0 || col >= this.width) {
      throw new RangeError(`Given col out of bounds of 0-${this.width}`);
    }

    return this.board[row][col];
  }

  isFilled(row: number, col: number): boolean {
    return this.at(row, col) !== 0;
  }

  // return lines that are cleared
  place(piece: TetrisBoardPiece, clear: boolean = false): number[] {
    const lineclears: number[] = [];
    for (const { x, y } of piece.getMinos()) {
      this.board[y][x] = piece.type;
      if (clear && this.lineFull(y)) {
        lineclears.push(y);
        this.lineclear(y);
      }
    }
    return lineclears;
  }

  clearPiece(piece: TetrisBoardPiece): void {
    for (const { x, y } of piece.getMinos()) this.board[y][x] = PieceEnum._;
  }

  isEmpty(): boolean {
    return this.board.flat().reduce((sum, c) => sum + c, 0) == PieceEnum._;
  }

  fromFumen(fumen: Fumen) {
    const fumenCellToCell = (cell: string) => PieceEnum[cell as Mino];
    const rows = decodeWrapper(fumen)[0].field.str({ reduced: true, garbage: false }).split('\n');
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j] = fumenCellToCell(rows[rows.length - 1 - i][j]);
      }
    }
  }

  toFumen(): Fumen {
    const cellToFumenCell = (cell: number) => PieceEnum[cell];
    const field = this.board
      .map((row) => row.map(cellToFumenCell).join(''))
      .toReversed()
      .join('');
    return encoder.encode([{ field: Field.create(field) }]) as Fumen;
  }

  reset(): void {
    this.board = Array.from({ length: this.height }, () => new Array(this.width).fill(PieceEnum._));
  }

  toString(): string {
    return this.board
      .toReversed()
      .map((row: PieceEnum[]) => row.map((val: PieceEnum) => PieceEnum[val]).join(''))
      .join('\n');
  }
}
