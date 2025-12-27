function* numbers(start) {
  let num = start;
  while (true) {
    yield num;
    num = num + 10;
  }
}

function isEvenlyDivisible(num, from, to) {
  for (let i = from; i < to; i++) {
    if (num % i !== 0) return false;
  }
  return true;
}

const main = () => {
  const from = 1;
  const to = 20;
  const x = numbers(to);
  while (true) {
    const num = x.next().value;
    if (isEvenlyDivisible(num, from, to)) return num;
  }
};

console.log(main());
