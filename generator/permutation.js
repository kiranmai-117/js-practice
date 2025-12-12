function* pairPermutations(numbers) {
  for (let ele = 0; ele < numbers.length; ele++) {
    for (let nxtEle = ele + 1; nxtEle < numbers.length; nxtEle++) {
      yield [numbers[ele], numbers[nxtEle]];
      yield [numbers[nxtEle], numbers[ele]];
    }
  }
}

const x = pairPermutations([3, 4, 5, 7, 6]);
console.log([...x]);
