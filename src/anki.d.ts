import type { Tuning } from './lib/TetrisGame';
import type { Bindings } from './lib/Keybind';
import type { Fumen } from './lib/types';

interface GameConfig {
  controls: Bindings;
  tuning: Tuning;
}

interface Parameters {
  pattern: string;
  initialFumen: Fumen;
  targetFumen: Fumen;
  fillBag: 'T' | 'F';
  coverMask: string;
}

declare global {
  interface Window {
    config: GameConfig;
    parameters: Parameters;
    ankiCardSide: 'front' | 'back';
  }

  function pycmd(command: string): void;
}
