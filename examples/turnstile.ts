import { State, Machine } from "../utils/state";

enum TurnsTile {
  Locked,
  Unlocked
};

const lock = new State<TurnsTile>(TurnsTile.Locked);
const unlock = new State<TurnsTile>(TurnsTile.Unlocked);

const turnstile = new Machine(lock, unlock);
turnstile.assignFinishState(lock);

turnstile.link(lock, unlock, "coin");
turnstile.link(unlock, lock, "push");
turnstile.link(lock, lock, "push");
turnstile.link(unlock, unlock, "coin");

export { turnstile };
