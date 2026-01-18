export class player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.moves = [];
  }
  recordMove(move){
    this.moves.push(move);
  }
  getMoves(){
    return this.moves.slice();
  }
}