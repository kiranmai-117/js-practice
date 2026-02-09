import { board } from "./board.js";

const sendGameState = async (board, player, oppPlayer, id = "") => {
  const state = {
    p1Moves: player.moves, p2Moves: oppPlayer.moves, done: player.done, board, id
  }
  await player.conn.write(new TextEncoder().encode(JSON.stringify(state)));
  // await oppPlayer.conn.write(new TextEncoder().encode(JSON.stringify(state)));
  // console.log("SEND TO BOTH PLAYER");

}

const getPosition = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const state = new TextDecoder().decode(buffer.slice(0, n));
  return JSON.parse(state);
}

const isWin = (moves) => {
  const winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let i = 0; i < winPositions.length; i++) {
    const count = winPositions[i].reduce((count, pos) => {
      if (moves.includes(pos)) {
        count++;
      }
      return count;
    }, 0);
    if (count === 3) return true;
  }
  return false;
}

const play = async (board, p1, p2) => {
  let p = [p2, p1];

  await sendGameState(board.board, ...p, 0 % 2 + 1);
  await sendGameState(board.board, p[1], p[0], 0 % 2 + 1);
  for (let i = 0; i < 9; i++) {
    p = (p[0] === p1) ? [p2, p1] : [p1, p2];

    const { position } = await getPosition(p[0].conn);
    console.log("user give the input", i);

    p[0].moves.push(position);

    console.log({ position, p1, p2 }, p[0].moves);

    board.updateBoard(position, p[0].symbol);

    await sendGameState(board.board, ...p, (i + 1) % 2 + 1);
    await sendGameState(board.board, p[1], p[0], (i + 1) % 2 + 1);

    if (isWin(p[0].moves)) {
      p[0].done = true;
      p[1].done = true;
      await sendGameState(board.board, ...p);
      await sendGameState(board.board, p[1], p[0]);
      return;
    }
  }
}

const start = async (board, p1, p2) => {
  board.generateBoard();
  await sendGameState(board.board, p1, p2, 1);
  await sendGameState(board.board, p2, p1, 2);



  await play(board, p1, p2);
}



const main = async () => {
  const playBoard = new board(9);
  const listener = Deno.listen({ port: 8000 });

  const p1 = await listener.next();
  const p2 = await listener.next();

  const player1 = {
    moves: [], conn: p1.value, symbol: 'X', done: false
  };

  const player2 = {
    moves: [], conn: p2.value, symbol: 'O', done: false
  };

  await start(playBoard, player1, player2);
}

await main();

