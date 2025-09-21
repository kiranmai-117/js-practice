const input = " ZLL  ZZZ ";
let noOfSpaces = -1;
let minimumDistance = 0;
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
    console.log("no of spaces",noOfSpaces);
    
  }

  if (input[index] === currentTerm) {
    noOfSpaces = -1;
  }

  if (input[index] !== "Z" && input[index] !== "L") {
    continue;
  }

  if ((minimumDistance > noOfSpaces) || minimumDistance <= 0) {
    minimumDistance = noOfSpaces;
    console.log("nearst",minimumDistance);
  }  
}

console.log("number of spaces away",minimumDistance);
