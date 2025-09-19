const number = 1;
let copyOfNumber = number;
let reversedNumber = 0;
while (copyOfNumber !== 0) {
  let lastDigit = copyOfNumber % 10;
  copyOfNumber = copyOfNumber / 10 - (lastDigit / 10);
  reversedNumber = reversedNumber * 10 + lastDigit;
}
if (number === reversedNumber) {
  console.log(number,"is palindrome");
} else {
  console.log(number,"is not palindrome");
}
