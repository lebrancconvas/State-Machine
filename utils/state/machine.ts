import { State } from "./state";

export class Machine<T> {
  states: State<T>[];
  startState: State<T> | null;
  finishStates: State<T>[];

  constructor(...state: State<T>[]) {
    this.states = [...state];
    this.startState = this.states[0] || null;
    this.finishStates = [];
  }

  lenState(): number {
    return this.states.length;
  }

  assignStartState(newStartState: State<T>) {
    this.startState = newStartState;
  }

  assignFinishState(newFinishState: State<T>) {
    this.finishStates.push(newFinishState);
  }

  link(source: State<T>, terminal: State<T>, code: string) {
    if(this.states.includes(source) && this.states.includes(terminal)) {
      source.link(terminal, code);
    } else {
      throw new Error(`[ERROR] Cannot link these two states together, because the state don't exist.`);
    }
  }

  process(input: string | string[]): boolean {
    if(this.startState === null) {
      throw new Error(`[ERROR] Cannot find the start state in the machine to process.`);
    }

    let inputCodes: string[] = [];
    if(typeof input === "string") {
      inputCodes = input.split("");
    } else {
      inputCodes = input;
    }

    let currentState: State<T> | null = this.startState;

    for(let i = 0; i < inputCodes.length; i++) {
      const code = inputCodes[i] || "";
      currentState = currentState?.move(code) || null;
    }

    if(currentState === null) {
      return false;
    }

    return this.finishStates.includes(currentState);
  }

  report(input: string | string[]): string {
    const result = this.process(input);
    if(result) {
      return `The Input String: ${input}\nResult -> VALID! (In this State Machine.)`;
    } else {
      return `The Input String: ${input}\nResult -> NOT VALID! (In this State Machine.)`;
    }
  }

};
