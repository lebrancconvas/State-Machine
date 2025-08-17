import { describe, it, expect } from "bun:test";
import { workMachine, turnstile, game } from "../examples";


describe("Example State Machine Testing.", () => {
  describe("Working Machine Testing", () => {
    it("Work Machine Object.", () => {
      expect(workMachine).toBeObject();
    });
  });

  describe("Turnstile Testing.", () => {
    it("Turnstile Object", () => {
      expect(turnstile).toBeObject();
    });
  });

  describe("Game State Machine Testing.", () => {
    it("Game State Machine Object", () => {
      expect(game).toBeObject();
    });
  });
});
