function* lineIterator(lines) {
  let index = 0;
  while (index < lines.length) {
    const lineEnd = lines.indexOf("\n", index);
    const line = lines.slice(index, lineEnd);
    index = lineEnd + 1;
    yield line;
  }
}

const x = lineIterator("hello\nthis\nis\ncool\nright!\n");
console.log([...x]);
