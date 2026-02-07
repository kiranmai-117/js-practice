export const play = async (board, p1, p2) => {
  let player = p2;
  let position;
  for (let i = 0; i < 9; i++) {
    player = (player === p1) ? p2 : p1;
    position = await player.getPosition(p1, p2);
    board.updateBoard(position, player.symbol);
    board.display(board);
    player.recordMove(position);
    if (player.isWin()) {
      return `${player.name} WON`;
    }
  }
  return "MATCH DRAW";
}