const sumOfMultiplesOF3And5 = (n) => {
  let sum = 0;
  for (let num = 1; num < n; num++) {
    if (num % 3 === 0 || num % 5 === 0) {
      sum += num;
    }
  }
  return sum;
};

console.log(sumOfMultiplesOF3And5(10));
console.log(sumOfMultiplesOF3And5(1000));
