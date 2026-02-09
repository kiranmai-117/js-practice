import { chunk } from "@std/collections";

export class Board {
  constructor(noOfCells) {
    this.noOfCells = noOfCells;
    this.board = [];
  }
  cell() {
    return " ".repeat(5) + "|";
  }

  init = () => {
    for (let i = 0; i < this.noOfCells; i++) {
      this.board.push(this.cell());
    }
    return this.board;
  };

  updateBoard = (players) => {
    for (const player of players) {
      const symbol = player.id;
      const moves = player.moves
      for (const positions of moves) {
        this.board[positions - 1] = symbol.padStart(5) + "|";
      }
    }
    return this.board;
  };

  display = () => {
    const rows = chunk(this.board, 3);
    console.clear();
    console.log(
      rows.map((row) => row.join("")).join("\n--------------------\n"),
    );
  };

  // getDetails() {
  //   return {      
  //   }
  // }
}