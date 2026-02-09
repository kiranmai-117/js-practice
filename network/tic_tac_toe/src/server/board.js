import { chunk } from "@std/collections";

export class board {
  constructor(noOfCells) {
    this.noOfCells = noOfCells;
    this.board = [];
  }
  cell() {
    return " ".repeat(5) + "|";
  }

  generateBoard = () => {
    for (let i = 0; i < this.noOfCells; i++) {
      this.board.push(this.cell());
    }
    return this.board;
  };

  updateBoard = (cell, char) => {
    this.board[cell - 1] = char.padStart(5) + "|";
    return this.board;
  };

  display = () => {
    const rows = chunk(this.board, 3);
    console.clear();
    console.log(
      rows.map((row) => row.join("")).join("\n--------------------\n"),
    );
  };
}