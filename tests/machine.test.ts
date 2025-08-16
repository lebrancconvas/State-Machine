import { describe, it, expect } from "bun:test";
import { Machine, State } from "../utils/state";
import { useTransition } from "react";


describe("State Machine Test.", () => {
  const s0 = new State(0);
  const s1 = new State(1);
  const s2 = new State(2);
  const auto = new Machine(s0, s1, s2);
  auto.assignFinishState(s2);

  auto.link(s0, s0, "c");
  auto.link(s0, s1, "a");
  auto.link(s1, s0, "b");
  auto.link(s1, s1, "a");
  auto.link(s1, s2, "c");
  auto.link(s2, s1, "d");
  auto.link(s2, s2, "b");

  it("The Start State is s0", () => {
    expect(auto.startState).toBe(s0);
  });

  it("Change the start state to be s1 instead of s0.", () => {
    const mockAuto = new Machine(s0, s1, s2);
    mockAuto.assignStartState(s1);
    expect(mockAuto.startState).toBe(s1);
    expect(mockAuto.startState).not.toBe(s0);
  });

  it("The Finish State is s2", () => {
    expect(auto.finishStates).toBeArray();
    expect(auto.finishStates.includes(s2)).toBe(true);
  });


  it("The Finish State is s1 too, because I add it.", () => {
    auto.assignFinishState(s1);
    expect(auto.finishStates).toBeArray();
    expect(auto.finishStates.includes(s1)).toBe(true);
  });

  it("The Amount of State in the State Machine is 3", () => {
    expect(auto.lenState()).toBe(3);
  });

  it("\'cabac\' is the valid string in this state machine.", () => {
    const testString = "cabac";
    expect(auto.process(testString)).toBe(true);
    expect(auto.report(testString)).toBe(`The Input String: ${testString}\nResult -> VALID! (In this State Machine.)`);
  });


  it("\'cad\' is not the valid string in this state machine.", () => {
    const testString = "cad";
    expect(auto.process(testString)).toBe(false);
    expect(auto.report(testString)).toBe(`The Input String: ${testString}\nResult -> NOT VALID! (In this State Machine.)`);
  });
});
