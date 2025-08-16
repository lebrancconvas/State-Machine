import { describe, it, expect } from "bun:test";
import { Machine, State } from "../utils/state";


describe("State Machine Test.", () => {
  const s0 = new State(0);
  const s1 = new State(1);
  const s2 = new State(2);
  const auto = new Machine(s0, s1, s2);

  auto.link(s0, s0, "c");
  auto.link(s0, s1, "a");
  auto.link(s1, s0, "b");
  auto.link(s1, s1, "a");
  auto.link(s1, s2, "c");
  auto.link(s2, s1, "d");
  auto.link(s2, s2, "b");

  it("The Start State is s0", () => {
    expect(auto.states[0]).toBe(s0);
  });

  it("The Finish State is s2", () => {
    expect(auto.finishState).toBe(s2);
  });

  it("\'cabac\' is the valid string in this state machine.", () => {
    expect(auto.process("cabac")).toBe(true);
  });


  it("\'cad\' is not the valid string in this state machine.", () => {
    expect(auto.process("cad")).toBe(false);
  });
});
