function* prime() {
  let i = 1;
  while (true) {
    let count = 0;
    for (let factor = 0; factor <= i; factor++) {
      if (i % factor === 0) {
        count++;
      }
    }
    if (count === 2) {
      yield i;
    }
    i++;
  }
}

const x = prime();
const series = x.take(5);
console.log([...series]);
