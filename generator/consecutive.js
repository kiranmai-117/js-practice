function* generator() {
  let i = 1;
  while (true) {
    yield [i++, i];
  }
}

const consecutive = generator();
