function* chunk(numbers, size) {
  let index = 0;
  while (index < numbers.length) {
    yield numbers.slice(index, index += size);
  }
}

const x = chunk([1, 2, 3, 4, 5, 9, 6], 2);
console.log([...x]);

function* customizeChunk(numbers, lastEle, noOfOverlap) {
  let index = 0;
  while (numbers.indexOf(lastEle, index) > -1) {
    yield numbers.slice(index, index + numbers.indexOf(lastEle) + 1);
    index = index + noOfOverlap - 1;
  }
}

const x1 = customizeChunk([1, 2, 3, 4, 5], 3, 2);
console.log([...x1]);
