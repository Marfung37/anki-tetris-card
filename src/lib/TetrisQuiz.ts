import { TetrisGame, DEFAULT_TUNING, type Event } from './TetrisGame';
import { type ParsedPattern, parsePattern, sfinderPieces, randomSfinderPieces } from './pieces';
import { TetrisBoardPiece } from './TetrisBoardPiece';
import { decodeWrapper, fumenSplit, fumenClearLines, setInitialFumenState } from './fumenUtils';
import { glueFumen, unglueFumen } from 'glue-fumen';
import { PieceEnum, Rotation } from './pieceData';
import { encoder, Field } from 'tetris-fumen';
import { BAG } from './constants';
import { Parser } from './pieces/parser';
import { ASTNode } from './pieces/defines';
import type { GeneratorLiteral, FilterBlock } from './pieces/defines';
import type { Fumen, Queue } from './types';
import type { Tuning } from './TetrisGame';
import type { Operation } from 'glue-fumen';
import type { Seed } from './random';

interface SaveState {
  parsedQueuePattern: ParsedPattern | null;
  initialFumen: Fumen | null;
  targetFumens: Fumen[];
  coverMask: string | null;
  fillBags: boolean;
  operations: TetrisBoardPiece[];
  seed: Seed;
}

const parser = new Parser();

// map for hexdigits to number of set bits
const HEX_TO_SET_BIT_COUNT = new Uint8Array(128).fill(0);
for (let i = 0; i < 16; i++) {
  const count = i.toString(2).replace(/0/g, '').length;
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

function getNthSetBit(hexstr: string, index: number): number {
  let count = 0;
  for (let i = 0; i < hexstr.length; i++) {
    const hexdigitBitCount = HEX_TO_SET_BIT_COUNT[hexstr[i].charCodeAt(0)];
    if (count + hexdigitBitCount <= index) {
      count += hexdigitBitCount;
      continue;
    }

    let hexdigit = parseInt(hexstr[i], 16);
    let nthBit = index - count;
    // 4 bits per hexdigit
    let result = i << 2;

    // handle this hexdigit for getting exact index in the hexdigit
    for (let j = 0; j < nthBit; j++) {
      // unset the first nth 1s
      hexdigit &= ~(1 << (31 - Math.clz32(hexdigit)));
    }
    result += Math.clz32(hexdigit) - 28;
    return result;
  }
  return -1;
}

// more effectively change pattern to require queue to prefix 
function filterPatternForQueuePrefix(parsedPattern: ParsedPattern, queue: Queue): ParsedPattern {
  let processedLength = 0;
  const result: ParsedPattern = [];
  for (const patternPart of parsedPattern) {
    // patternPart is the semi colon separated patterns
    const allBlocks: (GeneratorLiteral | FilterBlock)[][] = [];
    for (const blockArray of patternPart) {
      // array of blocks
      const blocks: (GeneratorLiteral | FilterBlock)[] = [];
      for (let i = 0; i < blockArray.length; i++) {
        const block = blockArray[i];

        if (processedLength >= queue.length) {
          blocks.push(Object.assign({}, block));
          continue;
        }

        if (block.type == ASTNode.GeneratorLiteral) {
          // give length of queues this generator would generate
          const queuePart = queue.slice(processedLength, processedLength + block.permute)
          processedLength += block.permute;
          if (processedLength <= queue.length) {
            const generators = parser.parse(queuePart);
            blocks.push(...generators);
          } else {
            // filter for specifically for that start
            const filterStr = `{/^${queuePart}/}`;
            const filterBlock = parser.parse(filterStr)[0];
            blocks.push(Object.assign({}, block));
            blocks.push(filterBlock);
          }
        } else {
          blocks.push(Object.assign({}, block));
        }
      }
      // code stolen from sfinderPieces
      const allBlocksInitialEnd = allBlocks.length;
      while (blocks.length > 0 && blocks[blocks.length - 1].type == ASTNode.GeneratorLiteral)
        allBlocks.splice(allBlocksInitialEnd, 0, [blocks.pop()!]);

      if (blocks.length > 0) allBlocks.splice(allBlocksInitialEnd, 0, blocks);
    }
    result.push(allBlocks);
  }
  return result;
}

export type QuizEvent = 'correct' | 'wrong' | 'next' | Event;

export class TetrisQuiz extends TetrisGame {
  private initialFumen: Fumen | null;
  private targetFumens: Fumen[];

  private coverMask: string | null;

  validTargetFumens: Fumen[];
  answered: boolean;

  // fumen for the answer that matches line clears from user
  runningTargetFumen: Fumen | null;

  // index of target fumen currently being used
  currentTargetIndex: number;

  // frequency map of pieces in target fumen
  private correctBuild: Uint8Array;
  private buildLength: number;
  private targetsPopulated: boolean;

  private parsedGeneralPattern: ParsedPattern | null;

  pendingEvents: QuizEvent[];

  constructor(
    pattern: string,
    initialFumen: Fumen | null = null,
    targetFumens: Fumen[],
    coverMask: string | null = null,
    fillBags: boolean = false,
    bagEndedPattern: string | null = null, // pattern ends with end of a bag
    handling: Tuning = DEFAULT_TUNING
  ) {
    super(pattern, fillBags, handling);
    this.initialFumen = initialFumen;
    this.targetFumens = targetFumens;
    this.coverMask = coverMask;
    this.validTargetFumens = [];
    this.runningTargetFumen = null;
    this.answered = false;
    this.currentTargetIndex = 0;
    if (bagEndedPattern === null)
      this.parsedGeneralPattern = null
    else
      this.parsedGeneralPattern = parsePattern(bagEndedPattern);

    this.targetsPopulated = false;

    this.pendingEvents = [];

    this.correctBuild = new Uint8Array(128).fill(0);
    this.buildLength = -1;
    if (this.initialFumen !== null) this.board.fromFumen(this.initialFumen);
  }

  setInitial(fumen: Fumen) {
    this.initialFumen = fumen;
    this.fullReset();
  }

  setTarget(fumens: Fumen[]) {
    this.targetFumens = fumens;
    this.fullReset();
  }

  setCoverMask(mask: string | null) {
    this.coverMask = mask;
    this.fullReset();
  }

  reset(soft: boolean = false): void {
    super.reset(soft);
    this.pendingEvents.push('reset');
    this.answered = false;
    this.currentTargetIndex = 0;
    if (this.initialFumen !== null) this.board.fromFumen(this.initialFumen);
    this.getNextTarget();
  }

  protected generateQueue() {
    let queue: Queue | null;
    if (!this.coverMask) {
      queue = super.generateQueue() as Queue | null;
      if (queue === null) return null;
    } else {
      const randIndex = this.random.randInt(0, countSetBits(this.coverMask));
      const index = getNthSetBit(this.coverMask, randIndex);
      const queues = sfinderPieces(this.parsedQueuePattern as ParsedPattern);
      if (queues === null) return null
      queue = queues[index] as Queue;
    }

    if (this.parsedGeneralPattern === null) {
      return queue;
    }

    // get pattern that requires queue to start it
    const parsedPattern = filterPatternForQueuePrefix(this.parsedGeneralPattern, queue);
    return randomSfinderPieces(parsedPattern, this.random.randInt);
  }

  // targetFumens[index] can contain multiple accepted final board states, find which ones are covered
  private getNextTarget() {
    // clear from last time this is ran
    this.validTargetFumens = [];
    this.correctBuild.fill(0);
    this.buildLength = -1;

    const fumens = fumenSplit(this.targetFumens[this.currentTargetIndex]);

    if (fumens.length > 0) {
      // determine which page could be the correct setup

      // get queue set in card
      const queue = this.currentQueue as Queue;

      for (let fumen of fumens) {
        if (this.initialFumen !== null) {
          fumen = setInitialFumenState(fumen, this.initialFumen);
        }
        const gluedFumen = glueFumen(fumen, { order: queue, hold: 1, srs180: true }) as Fumen[];
        if (gluedFumen.length > 0) {
          this.validTargetFumens.push(fumen);
          if (this.buildLength == -1) {
            const pages = decodeWrapper(gluedFumen[0]);
            this.buildLength = pages.length;
            for (const page of pages) {
              const index = page.operation!.type.charCodeAt(0);
              this.correctBuild[index]++;
            }
          }
        }
      }
    }
    if (this.validTargetFumens.length == 0) {
      throw new Error(
        'Invalid parameters to quiz as no valid target answer for given queue ' + this.currentQueue
      );
    }
    // set the answer to the first valid fumen
    this.runningTargetFumen = this.validTargetFumens[0];

    this.targetsPopulated = true;
  }

  lock(piece: TetrisBoardPiece | null = null) {
    if (!this.targetsPopulated) {
      throw new Error('Expected reset() to be run after initializing TetrisQuiz object');
    }

    const lineclears = this.harddrop(piece, true);

    // clear lines so correct setup shows up with the lines cleared
    if (this.runningTargetFumen !== null && lineclears.length > 0) {
      this.runningTargetFumen = fumenClearLines(this.runningTargetFumen as Fumen, lineclears);
    }

    const outOfPieces = !this.getNextPiece(false);

    if (this.pieceCount == this.buildLength) {
      const pages = [];
      const currentBuild = new Uint8Array(128).fill(0);

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
        const index = piece.charCodeAt(0);
        if (currentBuild[index] != this.correctBuild[index]) {
          correctPieces = false;
          break;
        }
      }

      if (correctPieces) {
        if (this.initialFumen !== null) pages[0].field = decodeWrapper(this.initialFumen)[0].field;
        const fumen = unglueFumen(encoder.encode(pages)) as Fumen;

        let congruent: boolean = false;
        for (const validFumen of this.validTargetFumens) {
          congruent ||= fumen == validFumen;
        }

        // go to next target
        if (congruent) {
          this.currentTargetIndex++;
          if (this.currentTargetIndex < this.targetFumens.length) {
            this.getNextTarget();
            if (!this.simulating) this.pendingEvents.push('next');
          } else if (this.currentTargetIndex == this.targetFumens.length) {
            // completed all steps in answer
            this.answered = congruent;
            this.runningTargetFumen = null;
            if (!this.simulating) this.pendingEvents.push('correct');
          }
        }
      }
    }

    if (outOfPieces) {
      this.reset(this.softReset);
    }

    // topped out
    if (this.checkCollide(this.active)) {
      this.reset(this.softReset);
    }
  }

  save(): SaveState {
    return {
      parsedQueuePattern: this.parsedQueuePattern,
      initialFumen: this.initialFumen,
      targetFumens: this.targetFumens,
      coverMask: this.coverMask,
      fillBags: this.fillBags,
      operations: this.operations,
      seed: this.seed
    };
  }

  restore(state: SaveState) {
    this.parsedQueuePattern = state.parsedQueuePattern;
    this.initialFumen = state.initialFumen;
    this.targetFumens = state.targetFumens;
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
