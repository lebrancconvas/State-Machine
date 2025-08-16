import { State } from "./state";

export class Machine {
  states: State[];
  startState: State | null;
  finishState: State | null;

  constructor(...state: State[]) {
    this.states = [...state];

    if(this.states.length > 0) {
      this.startState = this.states[0] as State;
      this.finishState = this.states[this.states.length - 1] as State;
    } else {
      this.startState = null;
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
    const firstCode = inputCodes[0] || "";
    let newState = this.startState?.move(firstCode);

    for(let i = 1; i < inputCodes.length; i++) {
      const code = inputCodes[i] || "";
      newState = newState?.move(code);
    }

    return newState === this.finishState;
  }

};
