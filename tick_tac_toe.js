function count(position, value, countX, countO) {
  const row = parseInt(position[0]);
  const col = parseInt(position[2]);

  if (row > 0) {
    countX[row - 1] = value === "🔥" ? countX[row - 1] + 1 : 0;
    countO[row - 1] = value === "🌊" ? countO[row - 1] + 1 : 0;
  }
  if (col > 0) {
    countX[col + 2] = value === "🔥" ? countX[col + 2] + 1 : 0;
    countO[col + 2] = value === "🌊" ? countO[col + 2] + 1 : 0;
  }
  if (col === row) {
    countX[6] = value === "🔥" ? countX[6] + 1 : 0;
    countO[6] = value === "🌊" ? countO[6] + 1 : 0;
  }
  if (col === row && row === 2 || Math.abs(col - row) === 2) {
    countX[7] = value === "🔥" ? countX[7] + 1 : 0;
    countO[7] = value === "🌊" ? countO[7] + 1 : 0;
  }
}

function isTriple(position, value, countX, countO) {
  count(position, value, countX, countO);
  console.log("countX", countX);
  console.log("countO", countO);

  if (countX.includes(3)) {
    return "🔥";
  }
  if (countO.includes(3)) {
    return "🌊";
  }
}

function updateBoard(board, row, col, value) {
  let box = board[row];
  board[row] = box.slice(0, 3 * col) + value + box.slice(3 * col + 2);
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
    const value = player === player1 ? "🔥" : "🌊";
    console.log(player);
    const position = prompt("tell the position:");
    board = isValidPosition(board, position, value);
    console.clear();
    console.log(board.join("\n"));
    const tripleValue = isTriple(position, value, countX, countO);
    if (tripleValue === "🔥") {
      return player1;
    }
    if (tripleValue === "🌊") {
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
    console.log(" 👉 if you want to play again \n");
    console.log(" 👉 please press upward arrow and press enter \n");
    return;
  }
  console.log(" 🏆🏆🏆🏆🏆🏆 🥳 congratulations  ", Winner, " 🥳 🏆🏆🏆🏆🏆🏆\n");
  console.log(" 👉 if you want to play again \n");
  console.log(" 👉 please press upward arrow and press enter \n");
}

function play() {
  const players = prompt("enter player names:");
  const index = players.indexOf(" ");
  const player1 = players.slice(0, index);
  const player2 = players.slice(index + 1);
  console.log(player1, ": '🔥'");
  console.log(player2, ": '🌊'");
  let board = generateBoard();
  console.log(board.join("\n"));
  const Winner = turns(board, player1, player2);
  win(Winner);
}

play();
