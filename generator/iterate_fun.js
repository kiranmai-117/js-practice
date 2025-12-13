function* iterate(func, arg) {
  while (true) {
    let current = `${func}` + "(" + `${arg}` + ")";
    yield current;
    arg = current;
  }
}

const x = iterate("f", "x");
console.log([...x.take(5)]);
