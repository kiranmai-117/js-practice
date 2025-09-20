const input = "ZL ZLL ";
let noOfSpaces = 1;
let nearestCount = 0;
let index = 0;

while ((index < (input.length - 1)) && noOfSpaces !== 0) {
  
  if (input[index] === " ") {
    index++;
    continue;
  }
  noOfSpaces = 0;

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

  if ((nearestCount > noOfSpaces) || nearestCount < 0) {
    nearestCount = noOfSpaces;
  }  
}

console.log("number of spaces away",nearestCount);
