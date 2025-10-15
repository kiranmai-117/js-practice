const PLY1_SYL = "🔥";
const PLY2_SYL = "🌊";

function count(position, value, countX, countO) {
  const row = parseInt(position[0][0]);
  const col = parseInt(position[0][2]);

  if (row > 0) {
    countX[row - 1] = value === PLY1_SYL ? countX[row - 1] + 1 : 0;
    countO[row - 1] = value === PLY2_SYL ? countO[row - 1] + 1 : 0;
  }

  if (col > 0) {
    countX[col + 2] = value === PLY1_SYL ? countX[col + 2] + 1 : 0;
    countO[col + 2] = value === PLY2_SYL ? countO[col + 2] + 1 : 0;
  }

  if (col === row) {
    countX[6] = value === PLY1_SYL ? countX[6] + 1 : 0;
    countO[6] = value === PLY2_SYL ? countO[6] + 1 : 0;
  }

  if (col === row && row === 2 || Math.abs(col - row) === 2) {
    countX[7] = value === PLY1_SYL ? countX[7] + 1 : 0;
    countO[7] = value === PLY2_SYL ? countO[7] + 1 : 0;
  }

}

function isTriple(position, value, countX, countO) {
  count(position, value, countX, countO);

  console.log("countX",countX);
  console.log("countO",countO);

  return countX.includes(3) || countO.includes(3);
}

function updateBoard(board, cell, value) {
  let box = board[cell[0]];
  board[cell[0]] = box.slice(0, 3 * cell[1]) + value + box.slice(3 * cell[1] + 2);
}

function isValidCell(board, position, value, cell) {
  cell.pop();
  cell.pop();

  const row = parseInt(position[0][0], 10);
  const col = parseInt(position[0][2], 10);

  cell.push(row + (row - 1));
  cell.push(col + (col - 1));

  let box = board[cell[0]];
  if (isNaN(cell[0]) || isNaN(col) || cell[0] < 1 || cell[0] > 7 || cell[1] < 1 || cell[1] > 7) {
    position.push(prompt("Invalid position enter again:"));
    position.shift();
    isValidCell(board, position, value, cell);
  }

  if (box[3 * cell[1]] !== " ") {
    position.push(prompt("filled enter again:"));
    position.shift();
    isValidCell(board, position, value, cell);
  }

  return true;
}

function turns(board, player1, player2, countX, countO) {
  const cell = [];

  for (let move = 0; move < 9; move++) {

    const player = move % 2 === 0 ? player1 : player2;
    const symbol = move % 2 === 0 ? PLY1_SYL : PLY2_SYL;

    console.log(player);
    const position = [prompt("tell the position:")];
    
    if (isValidCell(board, position, symbol, cell)) {
      updateBoard(board, cell, symbol);
    }

    console.clear();
    console.log(board.join("\n"));
    
    if (isTriple(position, symbol, countX, countO)) {
      win(symbol, player1, player2);
      return;
    }
  }
  win();
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

function win(symbol, player1, player2) {
  const winner = symbol === PLY1_SYL ? player1 : player2;

  if (winner === undefined) {
    console.log(" 🤝🤝🤝🤝🤝  match draw 🤝🤝🤝🤝🤝");
    console.log(" 👉 if you want to play again \n");
    console.log(" 👉 please press upward arrow and press enter \n");
    return;
  }
  console.log(" 🏆🏆🏆🏆🏆🏆 🥳 congratulations  ", winner, " 🥳 🏆🏆🏆🏆🏆🏆\n");
  console.log(" 👉 if you want to play again \n");
  console.log(" 👉 please press upward arrow and press enter \n");
}

function play(board, player1, player2) {
  const countX = [0, 0, 0, 0, 0, 0, 0, 0];
  const countO = [0, 0, 0, 0, 0, 0, 0, 0];

  turns(board, player1, player2, countX, countO);
}

function startGame() {
  const player1 = prompt("enter player1 name:");
  const player2 = prompt("enter player2 name:");

  console.log(`${player1}: ${PLY1_SYL}`);
  console.log(`${player2}: ${PLY2_SYL}`);

  const board = generateBoard();
  console.log(board.join("\n"));

  play(board, player1, player2);
}

startGame();
