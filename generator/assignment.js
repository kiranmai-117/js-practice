function* generator() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const x = generator();
const y = generator();
y.next();
// - Generate sequences of consecutive pairs [1,2,3,4,5]
const consecutive = x.take(5).map((a) => [a, y.next().value]);

console.log([...consecutive]);
