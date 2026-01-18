export const play = (board, p1, p2) => {
  let player = p2;
  let position;
  for (let i = 0; i < 9; i++) {
    player = (player === p1) ? p2 : p1;
    position = player.getPosition(p1, p2);
    board.updateBoard(position, player.symbol);
    console.clear();
    board.display(board);
    player.recordMove(position);
    if (player.isWin()) {
      return `${player.name} WON`;
    }
  }
  return "MATCH DRAW";
}