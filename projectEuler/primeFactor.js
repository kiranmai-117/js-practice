function* candidates(num) {
  let i = 1;
  let x = 6 * i;
  yield 2;
  yield 3;
  while (x < num) {
    yield x - 1;
    yield x + 1;
    x = 6 * ++i;
  }
}

const isPrime = function (x) {
  for (let i = 3; i <= Math.sqrt(x); i += 2) {
    if (x % i === 0) return false;
  }
  return true;
};

const number = Math.sqrt(600851475143);
const isFactor = (factor) => 600851475143 % factor === 0;

const primeFactors = candidates(number).filter(isPrime).filter(isFactor);
console.log(Math.max(...primeFactors));
