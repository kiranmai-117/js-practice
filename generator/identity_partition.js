function* partition(numbers) {
  let partition = [];
  for (let index = 0; index < numbers.length; index++) {
    partition.push(numbers[index]);
    if (partition[partition.length - 1] !== numbers[index + 1]) {
      yield partition;
      partition = [];
    }
  }
}

const x = partition([1, 1, 3, 2, 2, 3, 4, 4, 6, 7]);
console.log([...x]);
