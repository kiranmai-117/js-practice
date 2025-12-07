const makeScreen = (width, height) => 
  Array.from({length : height}, y => Array.from({length : width}, x => " "));


const displayScreen = (screen) => console.log(screen.map((x) => x.join("")).join("\n"));

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

const updateObject = (screen) => {
  
} 

const putCharAt = (x, y, char) => {
  screen[y][x] = char;
}

const drawHorizontal = (y, x, string) => {
  for (let i = x; i < string.length + x; i++) {
    putCharAt(i,y,string[i - x]);
  }
};

const drawVertical = (y, x, string) => {
  for (let i = y; i < string.length + y; i++) {
    putCharAt(x, i, string[i - y]);
  }
};

const main = () => {

const width = 30;
const height = 10;
const screen = makeScreen(width, height);
drawHorizontal(screen, 1, 0, "hello");
drawHorizontal(screen, 3, 10, "world");
drawHorizontal(screen, 5, 1, "la la lala");
drawVertical(screen, 0, 5, "hello");

setInterval(() => {
  console.clear();
  horizontalMarque(screen, 1);
  horizontalMarque(screen, 3);
  horizontalMarque(screen, 5);
  verticalMarque(screen, 5);
  displayScreen(screen);
}, 100);
}

main();