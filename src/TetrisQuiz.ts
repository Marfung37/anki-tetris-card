import { TetrisGame, DEFAULT_TUNING } from './TetrisGame';
import { type ParsedPattern, sfinderPieces } from './pieces';
import { TetrisBoardPiece } from './TetrisBoardPiece';
import {
  decodeWrapper,
  fumenSplit,
  fumenClearLines,
  setInitialFumenState
} from './fumenUtils';
import { glueFumen, unglueFumen } from 'glue-fumen';
import { PieceEnum, Rotation } from './pieceData';
import { encoder, Field } from 'tetris-fumen';
import { BAG } from './constants';
import type { Fumen, Queue } from './types';
import type { Tuning } from './TetrisGame';
import type { Operation } from 'glue-fumen';
import type { Seed } from './random';


interface SaveState {
  parsedQueuePattern: ParsedPattern | null;
  initialFumen: Fumen;
  targetFumen: Fumen;
  coverMask: string | null;
  fillBags: boolean;
  operations: TetrisBoardPiece[];
  seed: Seed;
}

// map for hexdigits to number of set bits
const HEX_TO_SET_BIT_COUNT = new Uint8Array(128).fill(0);
for (let i = 0; i < 16; i++) {
  const count = i.toString(2).replace(/0/g, "").length;
  const hex = i.toString(16);

  HEX_TO_SET_BIT_COUNT[hex.charCodeAt(0)] = count;
  HEX_TO_SET_BIT_COUNT[hex.toUpperCase().charCodeAt(0)] = count;
}
function countSetBits(hexstr: string): number {
  let count = 0;
  for (let i = 0; i < hexstr.length; i++) {
    count += HEX_TO_SET_BIT_COUNT[hexstr[i].charCodeAt(0)];
  }
  return count;
}

export class TetrisQuiz extends TetrisGame {
  private initialFumen: Fumen;
  private targetFumen: Fumen;

  private coverMask: string | null;

  validTargetFumens: Fumen[];
  answered: boolean;

  // fumen for the answer that matches line clears from user
  runningTargetFumen: Fumen | null;

  // frequency map of pieces in target fumen
  private correctBuild: Uint8Array;
  private buildLength: number;
  private targetsPopulated: boolean;

  constructor(
    pattern: string,
    initialFumen: Fumen,
    targetFumen: Fumen,
    coverMask: string | null = null,
    fillBags: boolean = false,
    handling: Tuning = DEFAULT_TUNING
  ) {
    super(pattern, fillBags, handling);
    this.initialFumen = initialFumen;
    this.targetFumen = targetFumen;
    this.coverMask = coverMask;
    this.validTargetFumens = [];
    this.runningTargetFumen = null;
    this.answered = false;

    this.targetsPopulated = false;

    this.correctBuild = new Uint8Array(128).fill(0);
    this.buildLength = -1;
    this.board.fromFumen(this.initialFumen);
  }


  setInitial(fumen: Fumen) {
    this.initialFumen = fumen;
    this.fullReset();
  }

  setTarget(fumen: Fumen) {
    this.targetFumen = fumen;
    this.fullReset();
  }

  setCoverMask(mask: string | null) {
    this.coverMask = mask;
    this.fullReset();
  }


  reset(soft: boolean = false): void {
    super.reset(soft);
    this.pendingEvents.push('reset')
    this.answered = false;
    this.board.fromFumen(this.initialFumen);
    this.getValidTargets();
  }

  protected generateQueue() {
    if (!this.coverMask) {
      return super.generateQueue();
    } else {
      const index = this.random.randInt(0, countSetBits(this.coverMask));
      const queues = sfinderPieces(this.parsedQueuePattern as ParsedPattern);
      return queues[index];
    }
  }

  // targetFumen can contain multiple accepted final board states, find which ones are covered
  private getValidTargets() {
    // clear from last time this is ran
    this.validTargetFumens = [];
    this.correctBuild.fill(0);
    this.buildLength = -1;

    const fumens = fumenSplit(this.targetFumen);

    if (fumens.length > 0) {
      // determine which page could be the correct setup
      const queue = this.queue.queue.map((piece) => PieceEnum[piece]).join('') as Queue;

      for (const fumen of fumens) {
        const setFumen = setInitialFumenState(fumen, this.initialFumen);
        const gluedFumen = glueFumen(setFumen, { order: queue, hold: 1, srs180: true }) as Fumen[];
        if (gluedFumen.length > 0) {
          this.validTargetFumens.push(fumen);
          if (this.buildLength == -1) {
            const pages = decodeWrapper(gluedFumen[0]);
            this.buildLength = pages.length;
            for (const page of pages) {
              const index = page.operation!.type.charCodeAt(0)
              this.correctBuild[index]++;
            }
          }
        }
      }
    }
    // DEBUG
    console.log(this.buildLength)
    for (let piece of BAG) {
      const index = piece.charCodeAt(0)
      console.log(piece, this.correctBuild[index])
    }

    if (this.validTargetFumens.length == 0) {
      throw new Error("Invalid parameters to quiz as no valid target answer for given queue " + this.currentQueue)
    }
    // set the answer to the first valid fumen
    this.runningTargetFumen = this.validTargetFumens[0];

    // determine the pieces used for final fumen
    // const initialBuild = new Uint8Array(128).fill(0);
    //
    // fumenCountPieces(this.initialFumen, initialBuild);
    // fumenCountPieces(this.validTargetFumens[0], this.correctBuild);
    //
    // this.buildLength = 0;
    // for (const piece of BAG) {
    //   const index = piece.charCodeAt(0)
    //   this.correctBuild[index] -= initialBuild[index];
    //   this.buildLength += this.correctBuild[index];
    // }

    this.targetsPopulated = true;
  }


  lock(piece: TetrisBoardPiece | null = null) {
    if (!this.targetsPopulated) {
      throw new Error("Expected reset() to be run after initializing TetrisQuiz object")
    }

    const lineclears = this.harddrop(piece, true);

    // clear lines so correct setup shows up with the lines cleared
    if (lineclears.length > 0) {
      this.runningTargetFumen = fumenClearLines(this.runningTargetFumen as Fumen, lineclears)
    }

    if (this.pieceCount == this.buildLength) {
      const pages = [];
      const currentBuild = new Uint8Array(128).fill(0);
      // DEBUG
      console.log("Checking Solution")

      for (const operation of this.operations.slice(
        this.totalPieceCount - this.pieceCount,
        this.totalPieceCount
      )) {
        const piece = PieceEnum[operation.type];
        pages.push({
          operation: {
            ...operation,
            type: piece,
            rotation: Rotation[operation.rotation]
          } as Operation
        } as { field?: Field; operation: Operation });
        currentBuild[piece.charCodeAt(0)]++;
      }

      // check if correct pieces used
      let correctPieces: boolean = true;
      for (const piece of BAG) {
        const index = piece.charCodeAt(0)
        if (currentBuild[index] != this.correctBuild[index]) {
          correctPieces = false;
          break;
        }
      }

      // DEBUG
      console.log("Checking Correct Pieces:", correctPieces)

      if (correctPieces) {
        pages[0].field = decodeWrapper(this.initialFumen)[0].field;
        const fumen = unglueFumen(encoder.encode(pages)) as Fumen;

        let congruent: boolean = false;
        console.log("Game Fumen:", fumen)
        for (const validFumen of this.validTargetFumens) {
          console.log("Solution Expected:", validFumen)
          congruent ||= fumen == validFumen;
        }

        // DEBUG
        console.log("Checking Congruent Boards:", congruent)

        this.answered = congruent;
        const event = congruent ? 'correct' : 'wrong';
        if (!this.simulating) this.pendingEvents.push(event);
      }
    }

    this.getNextPiece(false);
    console.log("Got next piece")

    // topped out
    if (this.checkCollide(this.active)) {
      this.reset(this.softReset);
    }
  }

  save(): SaveState {
    return {
      parsedQueuePattern: this.parsedQueuePattern,
      initialFumen: this.initialFumen,
      targetFumen: this.targetFumen,
      coverMask: this.coverMask,
      fillBags: this.fillBags,
      operations: this.operations,
      seed: this.seed,
    }
  }

  restore(state: SaveState) {
    this.parsedQueuePattern = state.parsedQueuePattern;
    this.initialFumen = state.initialFumen;
    this.targetFumen = state.targetFumen;
    this.coverMask = state.coverMask;
    this.fillBags = state.fillBags;
    this.operations = state.operations;
    this.seed = state.seed;

    this.random.seed(this.seed);

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
            `Neither piece in operations matches pieces in queue (active ${PieceEnum[this.active.type]}, hold ${PieceEnum[this.holdPiece]}, expected ${PieceEnum[piece.type]})`
          );
        }
        this.hold();
      }
      this.lock(piece);
    }
    this.simulating = false;
  }
}
