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

const uppernums = () => {
  const values = [];
  for (let i = center; i < radius + center; i++) {
    values.push(i);
  }
  return values;
};

const lowernums = () => {
  const values = [];
  for (let i = center; i > (center - radius); i--) {
    values.push(i);
  }
  return values;
};

const atcenter = () => {
  const values = [];
  for (let i = 1; i <= radius; i++) {
    values.push(center);
  }
  return values;
};

const rotations = {
  r1: { x: [...atcenter()], y: [...lowernums()] },
  r2: { x: [...uppernums()], y: [...lowernums()] },
  r3: { x: [...uppernums()], y: [...atcenter()] },
  r4: { x: [...uppernums()], y: [...uppernums()] },
  r5: { x: [...atcenter()], y: [...uppernums()] },
  r6: { x: [...lowernums()], y: [...uppernums()] },
  r7: { x: [...lowernums()], y: [...atcenter()] },
  r8: { x: [...lowernums()], y: [...lowernums()] },
};

const drawOnScreen = (x, y) => {
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
  for (const rotaion of Object.keys(rotations)) {
    setInterval(() => {
      console.clear();
      setTimeout(clearScreen, 0);
      console.log(drawOnScreen(rotations[rotaion].x, rotations[rotaion].y));
    }, i * 50);
    i += 2;
  }
};

rotate();
