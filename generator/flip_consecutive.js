function* flipConsecutives(numbers) {
  let i = 0;
  while (i < numbers.length) {
    yield (i % 2 === 0 && i !== numbers.length - 1)
      ? numbers[i + 1]
      : numbers[i - 1];
    i++;
  }
}

const x = flipConsecutives([2, 4, 6, 7]);
console.log([...x]);
