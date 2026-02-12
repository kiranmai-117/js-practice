import { board } from "./src/board.js";
import { Game } from "./src/game.js";
import { play } from "./src/tic_tac_toe.js";

const main = async () => {
  const b = new board(9);
  b.init();
  b.display();
  const name1 = prompt("enter your name");
  const name2 = prompt("enter your name");
  const game = new Game(name1,name2);
  console.log(await play(b, game));
};

main();
