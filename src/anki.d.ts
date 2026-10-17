import type { Tuning } from './TetrisGame';
import type { Bindings } from './Keybind';
import type { Fumen } from './types';

interface GameConfig {
  controls: Bindings;
  tuning: Tuning;
}

interface Parameters {
  pattern: string;
  intialFumen: Fumen;
  targetFumen: Fumen;
}

declare global {
  interface Window {
    config: GameConfig;
    parameters: Parameters;
  }

  function pycmd(command: string): void;
}
