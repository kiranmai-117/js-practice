import { display, updateBoard } from "../main.js";

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

const corners = [1, 3, 7, 9];

export function computer(ply1moves, ply2moves, pos) {
  let position;
  // console.log(pos);
  if (!ply1moves.includes(5) && !ply2moves.includes(5)) {
    position = 5;
  } else if (corners.includes(pos) && corners.length !== 4) {
    if (ply1moves.includes(pos - 6)) {
      position = pos - 3;
    } else if (ply1moves.includes(pos + 6)) {
      position = pos + 3;
    } else if (ply1moves.includes(pos + 2)) {
      position = pos + 1;
    } else if (ply1moves.includes(pos - 2)) {
      position = pos - 1;
    }
  } else if (corners.length) {
    position = corners.shift();
  } else {
    position = Math.ceil(Math.random() * 9);
  }

  if (!isValid(position, ply1moves, ply2moves)) {
    position = computer(ply1moves, ply2moves, pos);
  }
  return position;
}

export function play(board, name1, name2, bot) {
  const player1 = { name: name1, symbol: "X", moves: [] };
  const player2 = { name: name2, symbol: "O", moves: [] };
  let player = player2;
  let position;
  for (let i = 0; i < 9; i++) {
    player = (player === player1) ? player2 : player1;
    if (bot && player === player2) {
      position = computer(player1.moves, player2.moves, position);
    } else {
      position = getPosition(player, player1.moves, player2.moves);
    }
    updateBoard(board, position, player.symbol);
    console.clear();
    display(board);
    player.moves.push(position);
    if (isWin(player)) {
      console.log(player.name, "WON");
      return;
    }
  }
  console.log("MATCH DRAW");
}
