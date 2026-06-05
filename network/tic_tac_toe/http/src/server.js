import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { getCookie, setCookie } from "hono/cookie";
import { logger } from "hono/logger";

const ROOMS = [];
let roomNum = 1;
let players = 1;

const joinRoom = (c) => {
  const room = {
    players: ['X'],
    board: ["", "", "", "", "", "", "", "", ""],
    turn: 'X'
  }

  if (players === 2) {
    setCookie(c, 'symbol', 'O');
    setCookie(c, 'room', roomNum);

    players = 1;
    ROOMS[roomNum - 1].players.push('O');
    roomNum++;
    return;
  }

  players++;
  ROOMS.push(room);
  setCookie(c, 'symbol', 'X');
  setCookie(c, 'room', roomNum);
}

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.get('/board', (c) => {
    const num = getCookie(c, 'room');
    return c.json(ROOMS[num - 1].board);
  })

  app.get('/status', (c) => {

    if (ROOMS.at(-1).players.length === 2) {
      return c.json({ waiting: false });
    }

    return c.json({ waiting: true });
  })

  app.get('/play', (c) => {
    joinRoom(c);
    return c.text('ok');
  });

  app.get('*', serveStatic({ root: 'public' }));

  return app;
}
