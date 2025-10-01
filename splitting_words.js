function isVowel(letter) {
  switch (letter) {
    case "a": return true;
    case "e": return true;
    case "i": return true;
    case "o": return true;
    case "u": return true;
    default: return false;
  }
}

function splitWord(word) {
  let newWord = '';
  let nextLetterIs = (isVowel(word[0])) ? "v" : "c";
  let remainingLetters = '';

  for (let index = 0; index < word.length; index++) {

    if (nextLetterIs === "v" && isVowel(word[index])) {
      newWord = newWord + word[index];
      nextLetterIs = "c";
    } else if (nextLetterIs === "c" && !isVowel(word[index])) {
      newWord = newWord + word[index];
      nextLetterIs = "v";
    } else {
      remainingLetters = remainingLetters + word[index];
    }

  }

  console.log(newWord);
  return remainingLetters;
}

function testSplitWord(word) {
  let nextWord = word;
  while (nextWord.length !== 0) {
    nextWord = splitWord(nextWord);
  }
}


testSplitWord("apple");
testSplitWord("there");
testSplitWord("hello");
testSplitWord("abyss");
testSplitWord("air");
