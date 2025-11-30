const makeScreen = (x) => {
  const screen = [];
  for (let i = 0; i < x; i++) {
    screen.push(" ".repeat(x).split(""));
  }
  return screen;
};

const screen = makeScreen(10);

const drawOnScreen = (screen, x, y, char) => {
  screen[x][y] = char;
  return screen.map(x => x.join("")).join("\n");
};

const clearScreen = (screen) => {
  for (const i in screen) {
    for (const j in screen[i]) {
      screen[i][j] = " ";
    }
  }
};

let x = 0;
let y = 0;
const char = ["___======____=---=)",
"/T            \_--===)",
" [ \ (0)   \~    \_-==)",
"  \      / )J~~    \-=)",
"   \\\\___/  )JJ~~~   \)",
"    \_____/JJ~~~~~    \\",
"    / \  , \J~~~~~     \\",
'   (-\)\=|\\\\\~~~~       L__',
'   (\\\\)  (\\\\\)_           \==__',
"    \V    \\\\\) ===_____   \\\\\\\\\\\\",
"           \V)     \_) \\\\\\\\JJ\J\)",
'                       /J\JT\JJJJ)',
'                       (JJJ| \UUU)',
'                        (UU)'];
setInterval(() => {
  x = (x + 1) % 10;
  // y = (y + 1) % 10;
    console.clear();
    console.log(drawOnScreen(screen,x,y,char.join("\n")));
  clearScreen(screen);
}, 500);