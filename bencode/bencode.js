function decodeString(bencode) {
  const length = bencode.length;
  return bencode.slice(2, length);
}

function decodeInteger(bencode) {
  const length = bencode.length;
  return parseInt(bencode.slice(1, length - 1));
}

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

function decode(bencode) {
  const type = bencode[0];
  switch (type) {
    //case "": return decodeString(bencode);
    case "i": return decodeInteger(bencode);
    case "l": return decodeObject(bencode);
    default : return decodeString(bencode);
  }
}

function encode(data) {
  const type = typeof (data);
  switch (type) {
    case "string": return encodeString(data);
    case "number": return encodeInteger(data);
    case "object": return encodeObject(data);
  }
}

function symbol(expectedValue, actualValue) {
  return expectedValue === actualValue ? "✅" : "❌";
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

function testdecode(bencode, gist, expected) {
  const actual = decode(bencode);
  console.log(composeMessage(bencode, expected, actual, gist));
}

function testEncode(data, gist, expected) {
  const actual = encode(data);
  console.log(composeMessage(data, expected, actual, gist));
}

function testAllEncode() {
  console.log("\n  ENCODE DATA  \n");
  testEncode(123, "encode an integer", "i123e");
  testEncode(-53, "negative intergers", "i-53e");
  testEncode(0, "zero", "i0e");
  testEncode("hello", "encode a string", "5:hello");
  testEncode("", "empty string", "0:");
  testEncode("hello world", "string with spaces", "11:hello world");
  testEncode("special!@#$%char", "string with specila characters", "16:special!@#$%char");
  testEncode(["apple", 123], "simple array", "l5:applei123ee");
  testEncode([], "empty array", "le");
  testEncode(["apple", 123, ["banana", -5]], "nested array", "l5:applei123el6:bananai-5eee");
  testEncode([0, "", ["test"]], "nested array with empty string", "li0e0:l4:testee");
  testEncode(["", 0, []], "nested array with empty array", "l0:i0elee");
  testEncode(["one", ["two", ["three"]]], "multiple nested array", "l3:onel3:twol5:threeeee");
}

function testAlldecode() {
  console.log("\n  ENCODE DATA  \n");
  testdecode("i123e", "decode an integer", 123);
  testdecode("i-23e", "negative integer", -23);
  testdecode("i0e", "zero", 0);
  testdecode("5:hello", "a simple string", "hello");
}

//testAllEncode();
testAlldecode();
