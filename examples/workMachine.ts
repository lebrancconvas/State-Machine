import { State, Machine } from "../utils/state";

enum ProcessState {
  LOADING,
  PROCESS,
  SUCCESS,
  FAILED
};

const load = new State<ProcessState>(ProcessState.LOADING);
const proc = new State<ProcessState>(ProcessState.PROCESS);
const succ = new State<ProcessState>(ProcessState.SUCCESS);
const fail = new State<ProcessState>(ProcessState.FAILED);

const workMachine = new Machine(load, proc, fail, succ);

workMachine.link(load, load, "load");
workMachine.link(load, proc, "enter");
workMachine.link(proc, proc, "restart");
workMachine.link(proc, fail, "interrupt");
workMachine.link(proc, succ, "complete");

export { workMachine };
