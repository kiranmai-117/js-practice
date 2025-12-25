import { sumOf } from "jsr:@std/collections";

function* squares() {
  let i = 1n;
  while (true) {
    yield i * i;
    i += 2n;
  }
}

const oddSquares = squares().take(475000 / 2);
// console.log([...oddSquares].length);
const sum = oddSquares.reduce((sum, x) => x + sum);
console.log(sum);
