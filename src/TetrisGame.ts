import type { Queue } from './types';
import { TetrisQueue } from './TetrisQueue';
import { TetrisBoard } from './TetrisBoard';
import { TetrisBoardPiece } from './TetrisBoardPiece';
import { PRNG, type Seed } from './random';
import { type ParsedPattern, parsePattern, randomSfinderPieces } from './pieces';
import { PCSIZE, BOARDHEIGHT } from './constants';
import { get_kicks, spin_cw, spin_ccw, spin_180, PieceEnum, Rotation } from './pieceData';
import type { Action } from './Keybind';

const PREVIEWSIZE = 5;
const INITIALY = 19;
const INITIALX = 4;

export interface Tuning {
  arr: number;
  sdArr: number;
  das: number;
}

export const DEFAULT_TUNING = {
  arr: 0,
  sdArr: 0,
  das: 80
};

type MovementAction = Extract<Action, 'left' | 'right' | 'sd'>;

export type Event = string;

export class TetrisGame {
  board: TetrisBoard;
  queue: TetrisQueue;
  holdPiece!: PieceEnum;
  active!: TetrisBoardPiece;

  softReset: boolean = false;

  handling: Tuning;

  pieceCount: number;
  totalPieceCount: number;

  pendingEvents: Event[]; // bridge to frontend

  protected random: PRNG;
  protected seed: Seed;

  protected simulating: boolean;

  protected held!: boolean;
  private timers!: Record<MovementAction, number>;

  protected parsedQueuePattern: ParsedPattern | null;
  protected currentQueue: Queue | null;
  protected operations: TetrisBoardPiece[];

  protected fillBags: boolean;

  constructor(
    pattern: string = '',
    fillBags: boolean = false,
    handling: Tuning = DEFAULT_TUNING
  ) {
    this.handling = handling;
    this.pieceCount = 0;
    this.totalPieceCount = 0;

    this.pendingEvents = [];

    this.random = new PRNG();
    this.seed = this.random.reseed();

    this.simulating = false;

    this.queue = new TetrisQueue(PREVIEWSIZE, this.random);
    this.board = new TetrisBoard(PCSIZE, BOARDHEIGHT + 1);
    this.operations = [];

    this.parsedQueuePattern = null;
    this.currentQueue = null;

    this.fillBags = fillBags;
    this.parsedQueuePattern = parsePattern(pattern);

    this.queue.setFillBags(this.fillBags);
  }

  protected generateQueue(): string | null {
    return randomSfinderPieces(this.parsedQueuePattern as ParsedPattern, this.random.randInt);
  }

  setPattern(pattern: string): void {
    if (pattern.length > 0) {
      this.parsedQueuePattern = parsePattern(pattern);
      this.queue.setFillBags(this.fillBags);
    }
    this.fullReset();
  }

  protected setActive(piece: PieceEnum): void {
    if ([PieceEnum._, PieceEnum.X].includes(piece)) throw new Error('Unable to set active piece as gotten invalid piece');
    this.active = new TetrisBoardPiece(INITIALX, INITIALY, piece, Rotation.spawn);
  }

  fullReset(): void {
    this.seed = this.random.reseed();

    this.operations = [];
    this.totalPieceCount = 0;
    this.reset();
  }

  reset(soft: boolean = false): void {
    this.held = false;
    this.holdPiece = 0;
    this.timers = {
      left: -1,
      right: -1,
      sd: -1
    };

    this.queue.reset();
    this.board.reset();
    this.pieceCount = 0;

    // soft by keeping the queue
    if (this.parsedQueuePattern !== null) {
      if (soft) this.queue.set(this.currentQueue!);
      else {
        this.regen();
      }
    }

    if (this.parsedQueuePattern !== null && this.queue.previewSize > 1) {
      this.holdPiece = this.queue.poll();
    }

    this.setActive(this.queue.poll());
  }

  regen(): void {
    const queue = this.generateQueue();
    if (queue === null) {
      throw new Error('Pattern generates no queues');
    }
    this.currentQueue = queue as Queue;

    this.queue.set(this.currentQueue);
  }

  checkCollide(piece: TetrisBoardPiece): boolean {
    for (const pos of piece.getMinos()) {
      if (pos.x < 0 || pos.x >= PCSIZE || pos.y < 0 || this.board.isFilled(pos.y, pos.x)) {
        return true;
      }
    }
    return false;
  }

  getGhost(): TetrisBoardPiece {
    const ghost = this.active.copy();
    do ghost.move(0, -1);
    while (!this.checkCollide(ghost));
    ghost.move(0, 1);
    return ghost;
  }

  hold(): void {
    if (this.holdPiece === PieceEnum._) {
      if (this.queue.length == 0) {
        this.setActive(this.active.type);
        return;
      }
      this.holdPiece = this.active.type;
      this.setActive(this.queue.poll());
      return;
    }

    const tmp = this.active.type;
    this.setActive(this.holdPiece);
    this.holdPiece = tmp;
  }

  protected movePiece(dx: number, dy: number): boolean {
    // move piece directly to location and checks if collides there

    this.active.move(dx, dy);
    // didn't collide at that location
    if (!this.checkCollide(this.active)) {
      return true;
    }
    // reverse action
    this.active.move(-dx, -dy);
    return false;
  }

  spin(rotation: Rotation): void {
    const init = this.active.rotation;
    this.active.rotation = rotation;

    for (const [dx, dy] of get_kicks(this.active.type, init, rotation)) {
      if (this.movePiece(dx, dy)) return;
    }
    this.active.rotation = init;
  }

  spinCW(): void {
    this.spin(spin_cw(this.active.rotation));
  }

  spinCCW(): void {
    this.spin(spin_ccw(this.active.rotation));
  }

  spin180(): void {
    this.spin(spin_180(this.active.rotation));
  }

  down(): void {
    this.movePiece(0, -1);
  }

  protected harddrop(piece: TetrisBoardPiece | null = null, clear: boolean = true): number[] {
    // move piece as far down as possible (hd)
    if (piece !== null) {
      this.active.x = piece.x;
      this.active.y = piece.y;
      this.active.rotation = piece.rotation;
    } else {
      while (this.movePiece(0, -1));
      this.held = false;
      this.operations.push(this.active.copy());
    }
    this.pieceCount++;
    this.totalPieceCount++;
    return this.board.place(this.active, clear);
  }

  protected getNextPiece(resetted: boolean): void {
    // DEBUG
    console.log("Getting next piece")
    if (this.queue.length == 0) {
      if (this.holdPiece != PieceEnum._) {
        this.setActive(this.holdPiece);
        this.holdPiece = PieceEnum._;
      } else {
        // no more pieces
        this.reset(this.softReset);
      }
    } else if (!resetted) {
      this.setActive(this.queue.poll());
    }
  }

  lock(piece: TetrisBoardPiece | null = null): void {
    this.harddrop(piece);
    this.getNextPiece(false);

    // topped out
    if (this.checkCollide(this.active)) {
      this.reset(this.softReset);
    }
  }

  undo(): void {
    if (this.operations.length == 0) return;

    this.random.seed(this.seed);

    // remove last piece placed
    this.operations.pop();

    // run all the operations and simulate with the current board state should be now
    this.reset();
    this.simulating = true;
    this.totalPieceCount = 0;

    if (this.holdPiece == PieceEnum._) {
      this.hold();
    }

    for (const piece of this.operations) {
      if (this.active.type !== piece.type) {
        if (this.holdPiece !== piece.type) {
          console.error(
            `Undo neither piece in operations matches pieces in queue (active ${PieceEnum[this.active.type]}, hold ${PieceEnum[this.holdPiece]}, expected ${PieceEnum[piece.type]})`
          );
        }
        this.hold();
      }
      this.lock(piece);
    }
    this.simulating = false;
  }

  tick(time: number, actions: Set<Action>) {
    const buf = {
      left: false,
      right: false,
      sd: false
    };
    for (const action of actions) {
      switch (action) {
        case 'hold':
          this.hold();
          break;
        case 'undo':
          this.undo();
          break;
        case 'ccw':
          this.spinCCW();
          break;
        case 'cw':
          this.spinCW();
          break;
        case '180':
          this.spin180();
          break;
        case 'hd':
          this.lock();
          break;
        case 'd1':
          this.down();
          break;
        case 'reset':
          this.fullReset();
          break;
        case 'left':
        case 'right':
        case 'sd':
          buf[action] = true;
          break;
      }
    }
    let ldas = -1;
    let rdas = -1;

    if (!buf['left']) {
      this.timers['left'] = -1;
    } else if (
      this.timers['left'] != -1 &&
      time - this.timers['left'] >= this.handling.das + this.handling.arr
    ) {
      ldas = this.timers['left'] + this.handling.das;
    }

    if (!buf['right']) {
      this.timers['right'] = -1;
    } else if (
      this.timers['right'] != -1 &&
      time - this.timers['right'] >= this.handling.das + this.handling.arr
    ) {
      rdas = this.timers['right'] + this.handling.das;
    }

    // replace with arr later
    if (
      !(buf['left'] && buf['right'] && (ldas == -1 || rdas == -1)) &&
      ldas != -1 &&
      (rdas == -1 || ldas > rdas)
    ) {
      while (ldas + this.handling.arr < time) {
        if (!this.movePiece(-1, 0)) {
          ldas = time;
          break;
        }
        ldas += this.handling.arr;
        if (buf['sd']) {
          if (this.timers['sd'] == -1) {
            this.timers['sd'] = time;
          }
          let sddas = this.timers['sd'];
          while (sddas <= time) {
            if (!this.movePiece(0, -1)) {
              sddas = time;
              break;
            }
            sddas += this.handling.sdArr;
          }
          this.timers['sd'] = sddas;
        }
      }
      this.timers['left'] = ldas - this.handling.das;
      if (this.timers['right'] != -1) {
        this.timers['right'] = ldas - 1;
      }
    } else if (rdas != -1) {
      while (rdas + this.handling.arr < time) {
        if (!this.movePiece(1, 0)) {
          rdas = time - this.handling.das;
          break;
        }
        rdas += this.handling.arr;
        if (buf['sd']) {
          if (this.timers['sd'] == -1) {
            this.timers['sd'] = time;
          }
          let sddas = this.timers['sd'];
          while (sddas <= time) {
            if (!this.movePiece(0, -1)) {
              sddas = time;
              break;
            }
            sddas += this.handling.sdArr;
          }
          this.timers['sd'] = sddas;
        }
      }
      this.timers['right'] = rdas - this.handling.das;
      if (this.timers['left'] != -1) {
        this.timers['left'] = rdas - 1;
      }
    }
    if (buf['left'] && this.timers['left'] == -1) {
      this.movePiece(-1, 0);
      this.timers['left'] = time;
    }
    if (buf['right'] && this.timers['right'] == -1) {
      this.movePiece(1, 0);
      this.timers['right'] = time;
    }

    if (buf['sd']) {
      if (this.timers['sd'] == -1) {
        this.timers['sd'] = time;
      }
      let sddas = this.timers['sd'];
      while (sddas <= time) {
        if (!this.movePiece(0, -1)) {
          sddas = time;
          break;
        }
        sddas += this.handling.sdArr;
      }
      this.timers['sd'] = sddas;
    } else {
      this.timers['sd'] = -1;
    }
  }

  loadHandling(handling: Tuning): void {
    this.handling = handling;
  }
}
