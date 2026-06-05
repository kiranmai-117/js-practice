import { createFragment } from "./dom.js";

const createBoard = (board) =>
  board.map((cell, i) => ['a', { href: i, class: 'cell' }, cell]);

const renderBoard = async () => {
  const board = await fetch('/board').then(x => x.json());
  const body = document.querySelector('body');
  const x = createFragment(['div',{class:'board'},...createBoard(board)]);
  body.replaceChildren(x);
}

const poll = (waiting) => {
  const intervalId = setInterval(async () => {
    if (!waiting) {
      clearInterval(intervalId);
      renderBoard();
    }
    const body = document.querySelector('body');
    const heading = document.createElement('h1');
    heading.textContent = 'waiting.........';
    body.append(heading);
    const response = await fetch('/status').then(x => x.json());
    waiting = response.waiting;
  }, 1000);
}

window.onload = async () => {
  await fetch('/play');
  const { waiting } = fetch('/status').then(x => x.json());
  console.log({ waiting });
  poll(waiting);
}