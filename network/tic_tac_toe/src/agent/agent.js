import { chunk } from "@std/collections";

const getGameState = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const state = new TextDecoder().decode(buffer.slice(0, n));
  return JSON.parse(state);
}

const displayBoard = (board) => {
  const rows = chunk(board, 3);
  console.clear();
  console.log(
    rows.map((row) => row.join("")).join("\n--------------------\n"),
  );
};

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

const isValid = (position, ply1moves, ply2moves) => {
  console.log({ ply1moves, ply2moves });
  console.log(position > 0, position < 10, !ply1moves.includes(position), !ply2moves.includes(position));
  return position > 0 && position < 10 && !ply1moves.includes(position) &&
    !ply2moves.includes(position);
}

const getPosition = async (ply1moves, ply2moves) => {
  console.log('called');
  let position = await mapToCells();
  if (!isValid(position, ply1moves, ply2moves)) {
    console.log('invalid position', position);
    position = getPosition(ply1moves, ply2moves);
  }
  return position;
}

const sendPosition = async (conn, position) => {
  const json = JSON.stringify({ position });
  await conn.write(new TextEncoder().encode(json));
  console.log('data sent');
}

const play = async (conn) => {
  // let state = { p1Moves: [], p2Moves: [] };
  const state = await getGameState(conn);


  const id = state.id;

  while (true) {
    let state = await getGameState(conn);
    displayBoard(state.board);
    if (state.done) break;

    if (state.id !== id) {
      console.log("waiting");
      console.log("ID GOT", state.id, id);
      state = await getGameState(conn);
      displayBoard(state.board);
      if (state.done) break;
    }

    const position = await getPosition(state.p1Moves, state.p2Moves);
    console.log({ position });
    await sendPosition(conn, position);
    // displayBoard(state.board);
  }
  return 'done';
}

const start = async (conn) => {
  // const state = await getGameState(conn);
  // displayBoard(state.board);
  await play(conn);
}

const main = async () => {
  const conn = await Deno.connect({
    port: 8000
  });

  await start(conn);
}

await main();

disableRawMode()

