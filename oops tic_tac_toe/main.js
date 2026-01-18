import { board } from "./src/board.js";
import { player } from "./src/player.js";
import { play } from "./src/tic_tac_toe.js";

const main = () => {
  const b = new board(9);
  b.generateBoard();
  b.display();
  const name1 = prompt("enter your name");
  const name2 = prompt("enter your name");
  const p1 = new player(name1, 'X');
  const p2 = new player(name2, 'O');
  console.log(play(b,p1,p2));
};

main();
