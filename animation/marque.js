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

const display = () => console.log(screen.map((x) => x.join("")).join("\n"));

const verticalMarque = (col) => {
  let prev = screen[height - 1][col];
  for (let j = 0; j < height; j++) {
    const next = screen[j][col];
    screen[j][col] = prev;
    prev = next;
  }
};

const horizontalMarque = (row) => {
    let prev = screen[row][width - 1];
    for (let j = 0; j < width; j++) {
      const next = screen[row][j];
      screen[row][j] = prev;
      prev = next;
    }
};

const drawHorizontal = (y, x, string) => {
  for (let i = x; i < string.length + x; i++) {
    screen[y][i] = string[i - x];
  }
};

const drawVertical = (y, x, string) => {
  for (let i = y; i < string.length + y; i++) {
    screen[i][x] = string[i - y];
  }
};

drawHorizontal(1, 0, "hello");
drawHorizontal(3, 10, "world");
drawHorizontal(5, 1, "la la lala");
drawVertical(0, 5, "hello");

setInterval(() => {
  console.clear();
  horizontalMarque(1);
  horizontalMarque(3);
  horizontalMarque(5);
  verticalMarque(5);
  display();
}, 100);