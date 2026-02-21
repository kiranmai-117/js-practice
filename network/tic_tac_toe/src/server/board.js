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

  updateBoard = (position, symbol) => {
    this.board[position - 1] = symbol.padStart(5) + "|";
    return this.board;
  };
}