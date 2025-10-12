function count(position, value, countX, countO) {
  const row = parseInt(position[0]);
  const col = parseInt(position[2]);

  if (row === 1) {
    countX[0] = value === "X" ? countX[0] + 1 : 0;
    countO[0] = value === "O" ? countO[0] + 1 : 0;
  }
  if (row === 2) {
    countX[1] = value === "X" ? countX[1] + 1 : 0;
    countO[1] = value === "O" ? countO[1] + 1 : 0;
  }
  if (row === 3) {
    countX[2] = value === "X" ? countX[2] + 1 : 0;
    countO[2] = value === "O" ? countO[2] + 1 : 0;
  }
  if (col === 1) {
    countX[3] = value === "X" ? countX[3] + 1 : 0;
    countO[3] = value === "O" ? countO[3] + 1 : 0;
  }
  if (col === 2) {
    countX[4] = value === "X" ? countX[4] + 1 : 0;
    countO[4] = value === "O" ? countO[4] + 1 : 0;
  }
  if (col === 3) {
    countX[5] = value === "X" ? countX[5] + 1 : 0;
    countO[5] = value === "O" ? countO[5] + 1 : 0;
  }
  if (col === row) {
    countX[6] = value === "X" ? countX[6] + 1 : 0;
    countO[6] = value === "O" ? countO[6] + 1 : 0;
  }
  if (col === row && row === 2 || Math.abs(col - row) === 2) {
    countX[7] = value === "X" ? countX[7] + 1 : 0;
    countO[7] = value === "O" ? countO[7] + 1 : 0;
  }
}

function isTriple(position, value, countX, countO) {
  count(position, value, countX, countO);

  if (countX.includes(3)) {
    return "X";
  }
  if (countO.includes(3)) {
    return "O";
  }
}

function updateBoard(board, row, col, value) {
  let box = board[row];
  board[row] = box.slice(0, 3 * col) + value + box.slice(3 * col + 1);
  return board;
}

function isValidPosition(board, position, value) {
  let row = parseInt(position[0]);
  let col = parseInt(position[2]);
  row = row + (row - 1);
  col = col + (col - 1);
  let box = board[row];
  let place;
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    place = prompt("Invalid position enter again:");
    isValidPosition(board, place, value);
    return board;
  }

  if (box[3 * col] !== " ") {
    place = prompt("filled enter again:");
    isValidPosition(board, place, value);
    return board;
  }
  return updateBoard(board, row, col, value);
}

function turns(board, player1, player2) {
  let countX = [0, 0, 0, 0, 0, 0, 0, 0];
  let countO = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let count = 0; count < 9; count++) {
    const player = count % 2 === 0 ? player1 : player2;
    const value = player === player1 ? "X" : "O";
    console.log(player);
    const position = prompt("tell the position:");
    board = isValidPosition(board, position, value);
    console.clear();
    console.log(board.join("\n"));
    const tripleValue = isTriple(position, value, countX, countO);
    if (tripleValue === "X") {
      return player1;
    }
    if (tripleValue === "O") {
      return player2;
    }
  }
}

function generateLine(row, cols = 18, char = "-|") {
  if (row % char.length === 1) {
    return char[1] + (" ".repeat(5) + char[1]).repeat(3);
  }
  return char[0].repeat(cols);
}

function generateBoard() {
  const lines = [];
  for (let row = 0; row < 7; row++) {
    lines.push(generateLine(row));
  }
  return lines;
}

function win(Winner) {
  if (Winner === undefined) {
    console.log(" 🤝🤝🤝🤝🤝  match draw 🤝🤝🤝🤝🤝");
    return;
  }
  console.log(" 🏆🏆🏆🏆🏆🏆 congratulations  ", Winner, "🏆🏆🏆🏆🏆🏆\n");
}

function play() {
  const players = prompt("enter player names:");
  const index = players.indexOf(" ")
  const player1 = players.slice(0, index);
  const player2 = players.slice(index + 1);
  console.log(player1, ": 'X'");
  console.log(player2, ": 'O'");
  let board = generateBoard();
  console.log(board.join("\n"));
  const Winner = turns(board, player1, player2);
  win(Winner);
}

play();
