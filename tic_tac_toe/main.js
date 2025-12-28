import { chunk } from "jsr:@std/collections/chunk";
import { play } from "./src.js";

function* cells() {
  while (true) {
    yield " ".repeat(5) + "|";
  }
}

export const generateBoard = () => {
  const board = [...cells().take(9)];
  return board;
};

export const updateBoard = (board, cell, char) => {
  board[cell - 1] = char.padStart(5) + "|";
  return board;
};

export const display = (board) => {
  const rows = chunk(board, 3);
  console.log(
    rows.map((row) => row.join("")).join("\n--------------------\n"),
  );
};

const main = () => {
  const board = generateBoard();
  display(board);
  const player1 = prompt("enter your name");
  const player2 = prompt("enter your name");
  play(board, player1, player2);
};

main();
