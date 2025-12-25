const isPalindrome = (num) => {
  let copyOfNum = num;
  let rev = 0;
  while (copyOfNum != 0) {
    const lastDigit = copyOfNum % 10;
    rev = rev * 10 + lastDigit;
    copyOfNum = parseInt(copyOfNum / 10);
  }
  return rev === num;
};

const largestPalindrome = (noOfDigits) => {
  const largest = (10 ** noOfDigits) - 1;
  for (let i = largest; i > 0; i--) {
    for (let j = i; j > (largest - 10 ** (noOfDigits - 1)); j--) {
      const product = i * j;
      console.log(j);
      if (isPalindrome(product)) return product;
    }
  }
};

console.log(largestPalindrome(3));
console.log(isPalindrome(9009));
