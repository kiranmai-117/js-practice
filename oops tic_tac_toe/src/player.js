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

  #isValid(position, ply1moves, ply2moves) {
    return position > 0 && position < 10 && !ply1moves.includes(position) &&
      !ply2moves.includes(position);
  }

  getMoves() {
    return this.moves.slice();
  }
  enableRawMode = () => {
    Deno.stdin.setRaw(true);
    const encoder = new TextEncoder();

    Deno.stdout.writeSync(
      encoder.encode("\x1b[?1003h\x1b[?1006h")
    );
  }

  disableRawMode = () => {
    const encoder = new TextEncoder();
    Deno.stdout.writeSync(
      encoder.encode("\x1b[?1003l\x1b[?1006l")
    );
    Deno.stdin.setRaw(false);
  }

  getMouseClicks = async () => {
    const reader = Deno.stdin.readable.getReader();
    while (true) {
      const n = await reader.read();
      if (n.value[0] === 3) break;
      const pos = JSON.stringify(new TextDecoder().decode(n.value));
      const values = pos.match(/\d+;\d+;\d+/g)[0];
      const [b, x, y] = values.split(';');
      if (b === '0') {
        await reader.releaseLock();
        return [parseInt(x), parseInt(y)];
      }
    }
  }

  mapToCells = async () => {
    this.enableRawMode();
    let [x, y] = await this.getMouseClicks();
    if (y === 5) y = 6;
    if (y === 1) y = 0;
    const pos = y + Math.ceil(x / 6);
    this.disableRawMode();
    return pos;
  }

  getPosition = async (p1, p2) => {
    this.position = await this.mapToCells();
    const ply1moves = p1.getMoves();
    const ply2moves = p2.getMoves();
    if (!this.#isValid(this.position, ply1moves, ply2moves)) {
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