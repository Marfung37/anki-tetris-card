import type { Tuning } from './lib/TetrisGame';
import type { Bindings } from './lib/Keybind';
import type { Fumen } from './lib/types';

interface GameConfig {
  controls: Bindings;
  tuning: Tuning;
}

interface Parameters {
  pattern: string;
  initialFumen: Fumen | null;
  targetFumens: Fumen[];
  fillBag: boolean;
  coverMask: string;
}

declare global {
  interface Window {
    config: GameConfig;
    parameters: Parameters;
    ankiCardSide: 'front' | 'back';
    initializeSettings: (config: Config) => void;
  }

  function pycmd(command: string, callback?: (result: Object) => void): void;
}
