import { Board } from "./board.js";

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

const getGameState = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const state = new TextDecoder().decode(buffer.slice(0, n));
  return JSON.parse(state);
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
  await reader.releaseLock();
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

const isValid = (position, ply1moves, ply2moves) => {

  return position > 0 && position < 10 && !ply1moves.includes(position) &&
    !ply2moves.includes(position);
}

const getPosition = async (players) => {
  const [p1, p2] = players;
  let position = await mapToCells();
  if (!isValid(position, p1.moves, p2.moves)) {

    position = getPosition(players);
  }
  return position;
}

const sendPosition = async (conn, position) => {
  const json = JSON.stringify({ position });
  await conn.write(new TextEncoder().encode(json));

}


let i = 0

const fakeInput = (id) => {
  if (id === "x") {
    return [1, 2, 3, 4][i++]
  }

  return [5, 6, 7, 8, 9][i++]
}

const play = async (conn) => {
  const board = new Board(9);
  board.init();
  const { id } = await getGameState(conn);
  let { game } = await getGameState(conn);

  while (!(game.isEnd)) {
    board.display();
    console.log("ID :", id);

    if (game.isWin) {
      return;
    }

    if (game.chanceOf === id) {
      // const input = fakeInput(id);
      console.log("it's your turn...");

      const input = await getPosition(game.players);
      // prompt("")
      await sendPosition(conn, input);
    }
    const data = await getGameState(conn);
    game = data.game;
    board.updateBoard(game.players);
    board.display();
  }
  return 'done';
}

const main = async () => {
  const conn = await Deno.connect({
    port: 8000
  });
  await play(conn);
}

await main();
