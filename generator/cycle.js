function* cycle(numbers) {
  let index = 0;
  while (true) {
    yield numbers[index++ % numbers.length];
  }
}

const x = cycle([9, 8, 7, 6, 5]);
