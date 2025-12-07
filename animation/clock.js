const radius = 5;
const center = 7;
const size = 15;

const makeScreen = (x) => {
  const screen = [];
  for (let i = 0; i < x; i++) {
    screen.push(" ".repeat(x).split(""));
  }
  return screen;
};

const screen = makeScreen(size);
function sqr(x) {
  return x * x;
}

function distanceBetween(p1, p2) {
  const deltaX = p1[0] - p2[0];
  const deltaY = p1[1] - p2[1];
  return Math.sqrt(sqr(deltaX) + sqr(deltaY));
}

function drawCircle(width, height, cx, cy, radius) {
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      const d = distanceBetween([w, h], [cx, cy]);
      const char = (d < radius) ? "⚫️" : "⚪️";
      screen[h][w] = char;
    }
  }
}

const angles = (rad) => {
  const x = [];
  const y = [];
  for (let i = radius; i >= 0 ; i--) {
    y.push(Math.round(i * Math.sin(rad * 0.0174) + center));
    x.push(Math.round(i * Math.cos(rad * 0.0174) + center));
  }
  return [x,y];
}

const drawOnScreen = ([x, y]) => {
  for (let i = 0; i < x.length; i++) {
    screen[y[i]][x[i]] = "⚪️";
  }
  return screen.map((x) => x.join("")).join("\n");
};

const clearScreen = () => {
  drawCircle(size, size, center, center, radius);
};

const rotate = () => {
  let i = 1;
    setInterval(() => {
      console.clear();
      clearScreen();
      console.log(drawOnScreen(angles(i)));
      i += 2;
    }, i * 50);
};

rotate();