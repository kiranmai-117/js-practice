import { board } from "./board.js";
import { Player } from "../agent/player.js";
import { play } from "./tic_tac_toe.js";

const main = async () => {
  const b = new board(9);
  b.generateBoard();
  b.display();
  const name1 = prompt("enter your name");
  const name2 = prompt("enter your name");
  const p1 = new Player(name1, 'X');
  const p2 = new Player(name2, 'O');
  console.log(await play(b, p1, p2));
};

main();
