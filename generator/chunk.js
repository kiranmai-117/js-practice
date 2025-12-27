function* customizeChunk(numbers, size, noOfOverlap = 0) {
  let index = 0;
  while (index < numbers.length) {
    yield numbers.slice(index, index += size);
    if (index < numbers.length) {
      index -= noOfOverlap;
    }
  }
}

const x = customizeChunk([1, 2, 3, 4, 5, 9, 6], 2);
console.log([...x]);

const x1 = customizeChunk([1, 2, 3, 4, 5, 7, 8], 3, 2);
console.log([...x1]);
