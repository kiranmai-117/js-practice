export class Board {
  constructor() {
    this.board = [];
  }


  updateBoard = (position, symbol) => {
    this.board[position - 1] = `<a href="${position}" class="cell">
    ${symbol}
    </a>`;
    return this.board;
  }

  init = () => {
    for (let cell = 1; cell <= 9; cell++) {
      this.board.push(`<a href="${cell}" class="cell"></a>`);
    }
    return this.board;
  }
}