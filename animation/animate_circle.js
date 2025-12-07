const height = 30;
const width = 30;
const center = 15;
let rad = 1;

const makeScreen = (height, width) => {
  const screen = [];
  for (let i = 0; i < height; i++) {
    screen.push(" ".repeat(width).split(""));
  }
  return screen;
};

const clearScreen = () => {
  for (const i in screen) {
    for (const j in screen[i]) {
      screen[i][j] = " ";
    }
  }
};

const drawOnScreen = (x, y, char,screen) => {
  screen[y][x] = char;
  return screen.map((x) => x.join("")).join("\n");
};

const screen = makeScreen(height, width);
let radius = 1;
setInterval(() => {
  const y = Math.round(radius * 0.5 * Math.sin(rad * 0.0174) + center);  
  const x = Math.round(radius * Math.cos(rad * 0.0174) + center);  
  console.clear();
  console.log(drawOnScreen(x, y, "*", screen));
  rad += 1;
  if (rad > 360 && radius < 15) {
    clearScreen();
    radius++;
    rad = 1
  }
}, 1)