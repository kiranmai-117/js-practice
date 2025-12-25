let times = 0;

const isPrime = (x) => {
  times++;
  if (x % 2 === 0) return false;
  for (let i = 3; i < Math.sqrt(x); i += 2) {
    times++;
    if (x % i === 0) return false;
  }
  return true;
};

const benchmark = (x) => {
  times = 0;
  const result = isPrime(x);
  // console.log(x, times);
};

let total = 0;
for (let i = 2; i < 1000000; i++) {
  benchmark(i);
  total += times;
}

console.log("total:", total);

// 5775220
// 117499
// 65932
// 57603
// 41993
// 34600391
// 22879588
