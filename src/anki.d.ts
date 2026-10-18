import type { Tuning } from './TetrisGame';
import type { Bindings } from './Keybind';
import type { Fumen } from './types';

interface GameConfig {
  controls: Bindings;
  tuning: Tuning;
}

interface Parameters {
  pattern: string;
  initialFumen: Fumen;
  targetFumen: Fumen;
  fillBag: 'T' | 'F';
}

declare global {
  interface Window {
    config: GameConfig;
    parameters: Parameters;
    ankiCardSide: "front" | "back";
  }

  function pycmd(command: string): void;
}
