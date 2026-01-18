export class player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.position;
    this.moves = [];
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
  recordMove(move) {
    this.moves.push(move);
  }

  isValid(position, ply1moves, ply2moves) {
    return position > 0 && position < 10 && !ply1moves.includes(position) &&
      !ply2moves.includes(position);
  }

  getMoves() {
    return this.moves.slice();
  }

  getPosition(p1, p2) {
    this.position = parseInt(prompt(this.name));
    const ply1moves = p1.getMoves();
    const ply2moves = p2.getMoves();
    if (!this.isValid(this.position, ply1moves, ply2moves)) {
      this.position = this.getPosition(p1, p2);
    }
    return this.position;
  }

  isWin() {
  for (let i = 0; i < this.winPositions.length; i++) {
    const count = this.winPositions[i].reduce((count, pos) => {
      if (this.moves.includes(pos)) {
        count++;
      }
      return count;
    }, 0);
    if (count === 3) return true;
  }
  return false;
}
}