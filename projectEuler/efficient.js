function* candidates() {
  yield 2;
  yield 3;
  let n = 6;
  while (true) {
    yield n - 1;
    yield n + 1;
    n += 6;
  }
}

let times = 0;

const isPrime = (x) => {
  const i = candidates();
  let v = i.next();
  const k = Math.sqrt(x);
  while (v.value < k) {
    times++;
    if (x % v.value === 0) return false;
    v = i.next();
  }
  return true;
};

const benchmark = (x) => {
  times = 0;
  const result = isPrime(x);
};

const i = Iterator.from(candidates());

let v = i.next();
let total = 0;
while (v.value < 1000000) {
  benchmark(v.value);
  total += times;
  v = i.next();
}

console.log("total:", total);

// 41993
// 22879588
