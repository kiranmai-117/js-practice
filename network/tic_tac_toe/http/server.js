import { Board } from "./board.js";

const checkWin = (moves) => {
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

  console.log(moves);
  for (let i = 0; i < winPositions.length; i++) {
    const count = winPositions[i].reduce((count, pos) => {
      if (moves.includes(pos)) {
        count++;
      }
      return count;
    }, 0);
    if (count === 3) {
      return true;
    }
  }
  return false;
}


const createResponse = (board) => {
  const styles = Deno.readTextFileSync('board_style.css');
  const body = `<html>
  <head>
   <style>
    ${styles}
   </style>
  </head>
  <body>
    <div class="board">
      ${board.join('')}
    </div>    
  </body>
</html>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/html'
    }
  })
}

const winResponse = (player) => {
  const body = `<html>
  <body>
    <h1>${player.symbol} WON</h1>
  </body>
</html>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}

const players = [
  { moves: [], symbol: 'X' },
  { moves: [], symbol: 'O' }
];

let chanceOf = 0;

const requestHandler = (request, board) => {
  const requests = ['/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9'];
  const url = new URL(request.url).pathname;

  if (url === '/') {
    board.init();
  }
  const player = players[chanceOf];

  if (requests.includes(url)) {
    const pos = parseInt(url[1]);
    board.updateBoard(pos, player.symbol);
    player.moves.push(pos);
    chanceOf = 1 - chanceOf;
  }

  if (checkWin(player.moves)) {
    const response = winResponse(player);
    return response;
  }

  const response = createResponse(board.board);
  return response;
}

const main = () => {
  const board = new Board();
  Deno.serve((request) => requestHandler(request, board));
}

main();