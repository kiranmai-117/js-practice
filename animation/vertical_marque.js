const width = 30;
const height = 10;

const makeScreen = (x, y) => {
  const screen = [];
  for (let i = 0; i < y; i++) {
    screen.push(" ".repeat(x).split(""));
  }
  return screen;
};

const screen = makeScreen(width, height);

const verticalMarque = () => {
  for (let i = 0; i < width; i++) {
    let prev = screen[height - 1][i];
    for (let j = 0; j < height; j++) {
      const next = screen[j][i];
      screen[j][i] = prev;
      prev = next;
    }
  }
  return screen.map((x) => x.join("")).join("\n");
};

const drawOnScreen = (y, x, string) => {
  for (let i = y; i < string.length + y; i++) {
    screen[i][x] = string[i - y];
  }
  return screen.map((x) => x.join("")).join("\n");
};

console.log(drawOnScreen(0, 6, "hello"));

setInterval(() => {
  console.clear();
  console.log(verticalMarque());
}, 300);