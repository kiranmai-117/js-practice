function decodeObject(bencode) {
  const list = [];
  let end;
  for (let i = 1; i < bencode.length; i++) {
    if (bencode[i] === "i") {

      end = bencode.indexOf("e", i) + 1;
      list.push(decodeInteger(bencode.slice(i, end)));
      i = end - 1;
    } else if (bencode[i] === "l") {

      const items = decodeObject(bencode.slice(i, bencode.length));
      i = i + items[1];
      list.push(items[0]);
    } else if (bencode[i] === "e") {

      return [list, end];
    } else {

      const length = bencode[bencode.indexOf(":", i) - 1];
      end = parseInt(length) + 2 + i;
      list.push(decodeString(bencode.slice(i, end)));
      i = end - 1;
    }
  }
  return [list, end];
}

function decodeString(bencode) {
  const end = bencode.length;
  const startIndex = bencode.indexOf(":") + 1;
  return bencode.slice(startIndex, end);
}
function decodeInteger(bencode) {
  const end = bencode.length - 1;
  const start = bencode.indexOf("i") + 1;
  return parseInt(bencode.slice(start, end));
}

function encodeObject(data, bencode = "l") {
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
    case "i":
      return decodeInteger(bencode);
    case "l":
      return decodeObject(bencode)[0];
    default:
      return decodeString(bencode);
  }
}

function encode(data) {
  const type = typeof data;
  switch (type) {
    case "string":
      return encodeString(data);
    case "number":
      return encodeInteger(data);
    case "object":
      return encodeObject(data);
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
  testEncode(
    "special!@#$%char",
    "string with specila characters",
    "16:special!@#$%char",
  );
  testEncode(["apple", 123], "simple array", "l5:applei123ee");
  testEncode([], "empty array", "le");
  testEncode(
    ["apple", 123, ["banana", -5]],
    "nested array",
    "l5:applei123el6:bananai-5eee",
  );
  testEncode(
    [0, "", ["test"]],
    "nested array with empty string",
    "li0e0:l4:testee",
  );
  testEncode(["", 0, []], "nested array with empty array", "l0:i0elee");
  testEncode(
    ["one", ["two", ["three"]]],
    "multiple nested array",
    "l3:onel3:twol5:threeeee",
  );
  testEncode(
    ["one", ["two", ["three"]], 56],
    "multiple nested array",
    "l3:onel3:twol5:threeeei56ee",
  );
}

function testAlldecode() {
  console.log("\n  DECODE DATA  \n");
  testdecode("i123e", "decode an integer", 123);
  testdecode("i-23e", "negative integer", -23);
  testdecode("i0e", "zero", 0);
  testdecode("5:hello", "a simple string", "hello");
  testdecode("0:", "empty string", "");
  testdecode("11:hello world", "string with spaces", "hello world");
  testdecode(
    "16:special!@#$%char",
    "string with specila characters",
    "special!@#$%char",
  );
  testdecode("l5:applei123ee", "simple array", ["apple", 123]);
  testdecode("le", "empty array", []);
  testdecode("l5:applei123el6:bananai-5eee", "nested array", ["apple", 123, [
    "banana",
    -5,
  ]]);
  testdecode("li0e0:l4:testee", "nested array with empty string", [0, "", [
    "test",
  ]]);
  testdecode("l0:i0elee", "nested array with empty array", ["", 0, []]);
  // testdecode("l3:onel3:twol5:threeeee", "multiple nested array", ["one", ["two", ["three"]]]);
  // testdecode("l3:onel3:twol5:threeeei56ee", "multiple nested array", ["one", ["two", ["three"]], 56]);
}

testAllEncode();
testAlldecode();

// console.log(decodeObject("l3:onel3:twol5:threeeee"))
// console.log(decodeObject("l3:onel3:twol5:threeeei56ee"))
