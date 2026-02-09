export class Game {
  constructor(p1 = "x", p2 = "o") {
    this.p1 = p1
    this.p2 = p2
    this.p1Moves = []
    this.p2Moves = []
    this.players = [this.p1Moves, this.p2Moves]
    this.chanceOf = 0;
    this.winPositions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

  }

  getDetails() {
    return {
      players: [
        { id: this.p1, moves: this.p1Moves },
        { id: this.p2, moves: this.p2Moves }
      ],
      isWin: this.checkWin(),
      isDraw: this.isDraw(),
      isEnd: this.checkWin() || this.isDraw(),
      chanceOf: this.chanceOf === 0 ? this.p1 : this.p2
    }
  }

  setMove(pos) {
    this.players[this.chanceOf].push(pos);
    this.chanceOf = 1 - this.chanceOf;
  }

  checkWin() {
    console.log(this.players[this.chanceOf]);
    const moves = this.players[this.chanceOf]
    for (let i = 0; i < this.winPositions.length; i++) {
      const count = this.winPositions[i].reduce((count, pos) => {
        if (moves.includes(pos)) {
          count++;
        }
        return count;
      }, 0);
      if (count === 3) return true;
    }
    return false;
  }

  isDraw() {
    return this.players.reduce((prev, moves) => moves.length + prev, 0) === 9;
  }
}