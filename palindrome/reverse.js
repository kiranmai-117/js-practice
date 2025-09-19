const number = 121;
let copyOfNumber = number;
let reversedNumber = 0;
while (copyOfNumber !== 0) {
  let lastDigit = copyOfNumber % 10;
  copyOfNumber = copyOfNumber / 10 - (lastDigit / 10);
  reversedNumber = reversedNumber * 10 + lastDigit;
}
console.log(reversedNumber);
