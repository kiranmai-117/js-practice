const isValid = (position, ply1moves, ply2moves) => {
  return position > 0 && position < 10 && !ply1moves.includes(position) &&
    !ply2moves.includes(position);
}

const enableRawMode = () => {
  Deno.stdin.setRaw(true);
  const encoder = new TextEncoder();

  Deno.stdout.writeSync(
    encoder.encode("\x1b[?1003h\x1b[?1006h")
  );
}

const disableRawMode = () => {
  const encoder = new TextEncoder();
  Deno.stdout.writeSync(
    encoder.encode("\x1b[?1003l\x1b[?1006l")
  );
  Deno.stdin.setRaw(false);
}

const getMouseClicks = async () => {
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

const mapToCells = async () => {
  enableRawMode();
  let [x, y] = await getMouseClicks();
  if (y === 5) y = 6;
  if (y === 1) y = 0;
  const pos = y + Math.ceil(x / 6);
  disableRawMode();
  return pos;
}

const getPosition = async (p1, p2) => {
  console.log({ p1, p2 });
  let position = await mapToCells();
  const ply1moves = p1.moves;
  const ply2moves = p2.moves;
  if (!isValid(position, ply1moves, ply2moves)) {
    position = getPosition(p1, p2);
  }
  return position;
}


export const play = async (board, game) => {
  for (let i = 0; i < 9; i++) {
    const gameState = game.getGameDetails();
    const player = game.players[game.chanceOf];

    if (gameState.isWin) {
      return `${player.name} WON`;
    }

    const position = await getPosition(...gameState.players);
    board.updateBoard(position, player.symbol);
    board.display(board);
    game.setMove(position);
  }

  return "MATCH DRAW";
}