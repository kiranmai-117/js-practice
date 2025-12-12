function* identityPartion(numbers) {
  let partition = [];
  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    partition.push(element);
    if (element !== numbers[index + 1]) {
      yield partition;
      partition = [];
    }
  }
}

const x = identityPartion([1, 1, 1, 2, 2, 3, 1, 1, 5, 6]);
console.log([...x]);
