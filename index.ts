import { State, Machine } from "./utils/state";

function main() {
  const s0 = new State(0);
  const s1 = new State(1);
  const s2 = new State(2);

  const stateMachine = new Machine(s0, s1, s2);

  stateMachine.link(s0, s1, "a");
  stateMachine.link(s1, s2, "b");
  stateMachine.link(s2, s0, "c");
  stateMachine.link(s0, s0, "b");
  stateMachine.link(s1, s1, "c");
  stateMachine.link(s2, s2, "a");

  let result = stateMachine.process("rinne");
  console.log(result);
};

main();
