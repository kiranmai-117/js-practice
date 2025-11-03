function encodeObject(data, bencode = 'l') {
  for (let index = 0; index < data.length; index++) {
    bencode = bencode + encode(data[index]);
  }
  return `${bencode}e`;
}

function encodeString(data) {
  return `${data.length}:${data}`;
}

function encodeInteger(data) {
  return `i${data}e`;
}

function encode(data) {
  const type = typeof(data);
  switch(type) {
    case "string": return encodeString(data);
    case "number": return encodeInteger(data);
    case "object": return encodeObject(data);
  }
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
testEncode(-53, "negative intergers", "i-53e");
testEncode(0, "zero", "i0e");
testEncode("hello", "encode a string", "5:hello");
testEncode("", "empty string", "0:");
testEncode("hello world", "string with spaces", "11:hello world");
testEncode("special!@#$%char", "string with specila characters", "16:special!@#$%char");
testEncode(["apple", 123], "simple array", "l5:applei123ee");
