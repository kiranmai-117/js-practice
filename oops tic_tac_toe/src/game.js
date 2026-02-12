export class Game {
  constructor(p1Name, p2Name) {
    this.players = [{
      name: p1Name,
      symbol: 'X',
      moves: []
    },
    {
      name: p2Name,
      symbol: 'O',
      moves: []
    }];

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

  setMove(move) {
    this.players[this.chanceOf].moves.push(move);
    this.chanceOf = 1 - this.chanceOf;
  }

  getGameDetails() {
    return {
      players: this.players,
      chanceOf: this.chanceOf,
      isWin: this.isWin(this.players[0]) || this.isWin(this.players[1]),
    }
  }

  isWin(player) {
    const moves = player.moves;
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

}