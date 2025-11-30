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

const horizontalMarque = () => {
  for (let i = 0; i < height; i++) {
    let prev = screen[i][width - 1];
    for (let j = 0; j < width; j++) {
      const next = screen[i][j];
      screen[i][j] = prev;
      prev = next;
    }
  }
  return screen.map((x) => x.join("")).join("\n");
};

const drawHorizontal = (y, x, string) => {
  for (let i = x; i < string.length + x; i++) {
    screen[y][i] = string[i - x];
  }
  return screen.map((x) => x.join("")).join("\n");
};

const drawVertical = (y, x, string) => {
  for (let i = y; i < string.length + y; i++) {
    screen[i][x] = string[i - y];
  }
  return screen.map((x) => x.join("")).join("\n");
};

console.log(drawHorizontal(1, 0, "hello"));
console.log(drawHorizontal(3, 10, "dlrow"));
console.log(drawHorizontal(5, 1, "la la lala"));
console.log(drawVertical(0, 5, "akkaa"));

setInterval(() => {
  console.clear();
  console.log(horizontalMarque());
  verticalMarque();
}, 500);