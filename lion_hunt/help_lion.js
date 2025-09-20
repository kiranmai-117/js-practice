const input = " L L ZL ";
let noOfSpaces = 0;
let nearestCount = 0;
let index = 0;

while (index < (input.length - 1)) {
  
  if (input[index] === " ") {
    index++;
    continue;
  }

  let currentTerm = input[index];
  while (input[++index] === " ") {
    noOfSpaces++;
  }

  if (input[index] === currentTerm) {
    noOfSpaces = -1;
  }

  if (input[index] !== "Z" && input[index] !== "L") {
    continue;
  }

  if ((nearestCount > noOfSpaces) || nearestCount <= 0) {
    nearestCount = noOfSpaces;
    noOfSpaces = 0;
  }  
}

console.log("number of spaces away",nearestCount);
