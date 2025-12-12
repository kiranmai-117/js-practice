function* consecutive(numbers) {
  for (let index = 0; index < numbers.length - 1; index++) {
    yield [numbers[index], numbers[index + 1]];
  }
}

const x = consecutive([1, 2, 3, 4, 5]);
console.log([...x]);
