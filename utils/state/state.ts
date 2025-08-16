interface StateLink {
  state: State;
  code: string;
};

export class State {
  private _value: number;
  private _to: StateLink[];

  constructor(value: number) {
    this._value = value;
    this._to = [];
  }

  get value(): number {
    return this._value;
  }

  get to(): StateLink[] {
    return this._to;
  }

  link(terminalState: State, code: string) {
    const stateLink = {
      state: terminalState,
      code
    };
    this._to.push(stateLink);
  }

  move(code: string): State | null {
    const terminalState = this._to.find((state: StateLink) => state.code === code);
    if(!terminalState) {
      return null;
    }
    return terminalState.state;
  }
};
