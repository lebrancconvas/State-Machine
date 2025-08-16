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
    let newState: State | null = this.states[0] || null;

    for(let i = 0; i < inputCodes.length; i++) {
      const code = inputCodes[i] || "";
      newState = newState?.move(code) || null;
      if(newState === null) {
        return false;
      }
    }
    return Object.is(newState, this.finishState);
  }
};
