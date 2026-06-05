import { Board } from "./board.js";
import { Game } from "./game.js";

const getPosition = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const state = new TextDecoder().decode(buffer.slice(0, n));
  return JSON.parse(state);
}

const play = async (players, game, board) => {

  const allConnection = players.map(({ conn }) => conn);

  for (let i = 0; i < 9; i++) {

    const { position } = await getPosition(players[i % 2].conn);
    board.updateBoard(position, game.getSymbol());
    game.setMove(position);
    game.changeTurn();
    const gameDetails = game.getDetails();

    await broadCast(allConnection, {
      game: gameDetails,
      board: board.board
    })

    if (gameDetails.isEnd || gameDetails.isWin) {
      return
    }
  }
}



const broadCast = async (connections, data) => {
  for (const conn of connections) {
    await writeToConnetion(conn, data)
  }
}

const start = async (board, ...players) => {

  const game = new Game(...players.map(({ id }) => id))

  const allConnection = players.map(({ conn }) => conn)

  await broadCast(allConnection,
    {
      game: game.getDetails(),
      // chanceOf: players[0].symbol,
      board: board.board
    })

  await play(players, game, board);
}


const encoder = new TextEncoder()

const writeToConnetion = async (conn, data) => {
  await conn.write(encoder.encode(JSON.stringify(data)))
}


const createPlayer = async (conn, id) => {
  await writeToConnetion(conn, { id })
  return {
    moves: [], conn, id, done: false
  };
}

const createRoom = async (c1, c2) => {
  const player1 = await createPlayer(c1, "x");
  const player2 = await createPlayer(c2, "o");
  return { player1, player2 }
}


const runRoom = async ({ player1, player2 }) => {
  const board = new Board(9);
  board.init();
  await start(board, player1, player2);
}

const main = async () => {
  const connections = []

  const listener = Deno.listen({ port: 8000 });
  for await (const conn of listener) {
    connections.push(conn);
    if (connections.length === 2) {
      const room = await createRoom(...connections)
      runRoom(room);
      connections.length = 0;
    }
  }

}

await main();

