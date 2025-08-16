import { workMachine } from "./examples";

function main() {

  const workflows = ["load", "load", "enter", "restart", "complete"];
  const result = workMachine.report(workflows);

  console.log(result);
};

main();
