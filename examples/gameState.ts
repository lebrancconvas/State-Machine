import { State, Machine } from "../utils/state";

enum GameState {
  Stand,
  Jump,
  Run
};

enum Action {
  Nothing = "Press Nothing",
  Up = "Up",
  A = "A"
};

const stand = new State<GameState>(GameState.Stand);
const jump = new State<GameState>(GameState.Jump);
const run = new State<GameState>(GameState.Run);


const game = new Machine(stand, jump, run);

game.assignStartState(stand);
game.assignFinishState(stand);


game.link(stand, stand, Action.Nothing);
game.link(stand, jump, Action.Up);
game.link(stand, run, Action.A);
game.link(jump, run, Action.A);
game.link(jump, stand, Action.Nothing);
game.link(run, stand, Action.Nothing);
game.link(run, jump, Action.Up);


export { game };
