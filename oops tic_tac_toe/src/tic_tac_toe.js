function isWin(player) {
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

export function getPosition(player, p1, p2) {
  let position = parseInt(prompt(player.name));
  const ply1moves = p1.getMoves();
  const ply2moves = p2.getMoves();
  if (!isValid(position, ply1moves, ply2moves)) {
    position = getPosition(player, p1, p2);
  }
  return position;
}

export const play = (board, p1, p2) => {
  let player = p2;
  let position;
  for (let i = 0; i < 9; i++) {
    player = (player === p1) ? p2 : p1;
    position = getPosition(player, p1, p2);
    board.updateBoard(position, player.symbol);
    console.clear();
    board.display(board);
    player.recordMove(position);
    if (isWin(player)) {
      return `${player.name} WON`;
    }
  }
  return "MATCH DRAW";
}