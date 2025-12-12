function* consecutive(numbers) {
  let index = 0;
  while (true) {
    yield [numbers[index++], numbers[index]];
  }
}

const x = consecutive([1, 2, 3, 4, 5]);
