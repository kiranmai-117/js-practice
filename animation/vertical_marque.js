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

const verticalMarque = (x) => {
  let prev = screen[height - 1][x];
  for (let j = 0; j < height; j++) {
    const next = screen[j][x];
    screen[j][x] = prev;
    prev = next;
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
  console.log(verticalMarque(6));
}, 300);
