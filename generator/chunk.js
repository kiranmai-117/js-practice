function* chunk(numbers, size) {
  let index = 0;
  while (index < numbers.length) {
    yield numbers.slice(index, index += size);
  }
}

const x = chunk([1, 2, 3, 4, 5, 9, 6], 2);
console.log([...x]);
