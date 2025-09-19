const number = 21;
let binary = "";
let remaider = 0;
let  copyOfNumber= number;
const subString = "10";
while (copyOfNumber !== 0) {
  remaider = copyOfNumber%2;
  binary = remaider + binary ;
  copyOfNumber = copyOfNumber/2;
  if (r === 1) {
    copyOfNumber = copyOfNumber - 0.5;
  }
}
console.log("binary is ",binary);
