import { updateBoard } from "./main.js";
import { display } from "./main.js";

export function isWin(player) {
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
      if (player.moves.includes(pos)) {
        count++;
      }
      return count;
    }, 0);
    if (count === 3) return true;
  }
  return false;
}

export function isValid(position, ply1moves, ply2moves) {
  return position > 0 && position < 10 && !ply1moves.includes(position) &&
    !ply2moves.includes(position);
}

export function getPosition(player, ply1moves, ply2moves) {
  let position = parseInt(prompt(player.name));
  if (!isValid(position, ply1moves, ply2moves)) {
    position = getPosition(player, ply1moves, ply2moves);
  }
  return position;
}

export function play(board, name1, name2) {
  const player1 = { name: name1, symbol: "X", moves: [] };
  const player2 = { name: name2, symbol: "O", moves: [] };
  let player = player2;
  while (!isWin(player)) {
    player = (player === player1) ? player2 : player1;
    const position = getPosition(player, player1.moves, player2.moves);
    updateBoard(board, position, player.symbol);
    console.clear();
    display(board);
    player.moves.push(position);
  }
}
