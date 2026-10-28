export type Action =
  'left' | 'right' | 'hold' | 'cw' | 'ccw' | '180' | 'sd' | 'hd' | 'd1' | 'reset' | 'undo';
export type Bindings = Record<Action, string>;
type Subscriber = (bindings: Bindings) => void;

const DEFAULT: Bindings = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  hold: 'KeyC',
  cw: 'KeyX',
  ccw: 'KeyZ',
  180: 'ShiftLeft',
  sd: 'ArrowDown',
  hd: 'Space',
  d1: 'KeyH',
  reset: 'KeyR',
  undo: 'Ctrl+KeyZ'
};

export class Keybind {
  binding: Bindings;
  lookup: Record<string, Action> = {};
  private subscribers: Subscriber[];

  constructor(binding: Bindings) {
    this.binding = binding;
    this.subscribers = [];
    this.notify();
  }

  rebuildLookup(): void {
    this.lookup = {};
    for (const [action, key] of Object.entries(this.binding)) {
      this.lookup[key] = action as Action;
    }
  }

  set(action: Action, key: string): void {
    // unset if key already in use
    const dupAction = Object.keys(this.binding).find(
      (k) => this.binding[k as Action] === key
    ) as Action;

    if (dupAction) this.binding[dupAction] = '-';
    this.binding[action] = key;
  }

  get(action: Action): string {
    return this.binding[action];
  }

  subscribe(run: Subscriber): () => void {
    this.subscribers.push(run);
    run(this.binding);
    return () => {
      this.subscribers = this.subscribers.filter((fn) => fn !== run);
    };
  }

  notify() {
    this.rebuildLookup();
    this.subscribers.forEach((fn) => fn(this.binding));
  }

  reset(defaultBinds: Bindings = DEFAULT) {
    this.binding = { ...defaultBinds };
    this.notify();
  }
}

export const keybinds = new Keybind(DEFAULT);
