// function* candidates(num) {
//   let i = 1;
//   let x = 6 * i;
//   yield 2;
//   yield 3;
//   while (x < num) {
//     yield x - 1;
//     yield x + 1;
//     x = 6 * ++i;
//   }
// }

function* candidates(num) {
  let i = parseInt(num / 6);
  let x = 6 * i;
  while (x > 1) {
    yield x - 1;
    yield x + 1;
    x = 6 * --i;
  }
}

const isPrime = function (num) {
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

const isFactor = (number, factor) => number % factor === 0;

const largestPrimeFactor = (num) => {
  const x = candidates(num);
  let candidate = x.next().value;
  while (candidate) {
    if (isFactor(num, candidate) && isPrime(candidate)) {
      return candidate;
    }
    candidate = x.next().value;
  }
};

const number = 600851475143;
// const number = 13195;

console.log(largestPrimeFactor(number));
