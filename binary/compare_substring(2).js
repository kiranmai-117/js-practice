const number = 21;
let binary = "";
let remainder = 0;
let copyOfNumber = number;
let copyOfString = "";
let count = 0;
const subString = "10";
while (copyOfNumber !== 0) {
  remainder = copyOfNumber%2;
  binary = remainder + binary ;
  copyOfNumber = copyOfNumber/2;
  if (remainder === 1) {
    copyOfNumber = copyOfNumber - 0.5;
  }
  copyOfString = remainder + copyOfString;
  console.log(copyOfString);
  
  if (copyOfString === subString) {
    count ++;
  }
  copyOfString = remainder + "";
}
console.log("binary is ",binary);
console.log("count of occurance:",count);

