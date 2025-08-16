import { State } from "./state";

export class Machine {
  states: State[];
  finishState: State | null;

  constructor(...state: State[]) {
    this.states = [...state];

    if(this.states.length > 0) {
      this.finishState = this.states[this.states.length - 1] as State;
    } else {
      this.finishState = null;
    }
  }

  link(source: State, terminal: State, code: string) {
    if(this.states.includes(source) && this.states.includes(terminal)) {
      source.link(terminal, code);
    } else {
      throw new Error(`[ERROR] Cannot link these two states together, because the state don't exist.`);
    }
  }

  process(inputString: string): boolean {
    const inputCodes = inputString.split('');
    let currentState: State | null = this.states[0] || null;

    for(let i = 0; i < inputCodes.length; i++) {
      if(currentState === null) {
        return false;
      }
      const code = inputCodes[i] || "";
      currentState = currentState?.move(code) || null;
    }

    return Object.is(currentState, this.finishState);
  }
};
