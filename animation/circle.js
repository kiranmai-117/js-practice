const radius = 6;
const height = 20;
const width = 20;
const center = 7;
let rad = 1;

const makeScreen = (height, width) => {
  const screen = [];
  for (let i = 0; i < height; i++) {
    screen.push(" ".repeat(width).split(""));
  }
  return screen;
};
const screen = makeScreen(height, width);

const drawOnScreen = (x, y, char) => {
  screen[y][x] = char;
  return screen.map((x) => x.join("")).join("\n");
};

setInterval(() => {
  const y = Math.round(radius * 0.5 * Math.sin(rad * 0.0174) + center);  
  const x = Math.round(radius * Math.cos(rad * 0.0174) + center);  

  console.clear();
  console.log(drawOnScreen(x, y, "*"));
  rad++;
}, 10)
