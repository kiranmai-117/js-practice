function encode(data) {
  return `i${data}e`;
}

function symbol(expectedValue, actualValue) {
  return `${expectedValue}` === `${actualValue}` ? "✅" : "❌";
}

function composeMessage(data, expected, actual, gist) {
  const emoji = symbol(expected, actual);
  let message = emoji + "  " + gist;
  if (emoji === "❌") {
    const inputPart = "\n\t| input : " + data;
    const expectedPart = "\n\t| expected : \n" + expected;
    const actualPart = "\n\t| actual : \n" + actual;
    message = message + inputPart + expectedPart + actualPart;
  }

  return message;
}

function testEncode(data, gist, expected) {
  const actual = encode(data);
  console.log(composeMessage(data, expected, actual, gist));
}

testEncode(123, "encode an integer", "i123e");
