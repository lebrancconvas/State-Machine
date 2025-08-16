import { describe, it, expect } from "bun:test";
import { State } from "../utils/state";

describe("State Class.", () => {
  const s0 = new State(0);
  const s1 = new State(1);
  s0.link(s1, "a");

  it("The States have the correct value.", () => {
    expect(s0.value).toBe(0);
    expect(s1.value).toBe(1);
  });

  it("The States have the correct linked state.", () => {
    expect(s0.to).toBeArray();

    const index = 0;
    const testLinkedState = s0.to[index];
    expect(testLinkedState).toBeObject();
    expect(testLinkedState?.state).toBe(s1);
    expect(testLinkedState?.code).toBe("a");
  });

  it("Move to the correct state.", () => {
    expect(s0.move("a")).toBeObject();
    expect(s0.move("a")).toBe(s1);
  });
});
