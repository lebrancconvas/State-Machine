interface StateLink<T> {
  state: State<T>;
  code: string;
};

export class State<T> {
  private _value: number;
  private _to: StateLink<T>[];

  constructor(value: number) {
    this._value = value;
    this._to = [];
  }

  get value(): number {
    return this._value;
  }

  get to(): StateLink<T>[] {
    return this._to;
  }

  link(terminalState: State<T>, code: string) {
    const stateLink = {
      state: terminalState,
      code
    };
    this._to.push(stateLink);
  }

  move(code: string): State<T> | null {
    const terminalState = this._to.find((state: StateLink<T>) => state.code === code);
    if(!terminalState) {
      return null;
    }
    return terminalState.state;
  }
};
