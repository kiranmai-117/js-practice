import { sumOf } from "jsr:@std/collections";

function* fibonacci(n) {
  let i = 1;
  let j = 2;
  yield i;
  while (j <= n) {
    yield j;
    const k = i + j;
    i = j;
    j = k;
  }
}

const series = fibonacci(4000000);
const evens = series.filter((x) => x % 2 === 0);
console.log(sumOf([...evens], (x) => x));
