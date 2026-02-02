const enableRawMode = () => {
  Deno.stdin.setRaw(true);
  const encoder = new TextEncoder();

  Deno.stdout.writeSync(
    encoder.encode("\x1b[?1003h\x1b[?1006h")
  );
}

const disableRawMode = () => {
  const encoder = new TextEncoder();
  Deno.stdout.writeSync(
    encoder.encode("\x1b[?1003l\x1b[?1006l")
  );
  Deno.stdin.setRaw(false);
}

const readRawdata = async () => {
  const reader = Deno.stdin.readable.getReader();
  while (true) {
    const n = await reader.read();
    if (n.value[0] === 3) break;
    const pos = JSON.stringify(new TextDecoder().decode(n.value));
    const values = pos.match(/\d+;\d+;\d+/g)[0];
    const [_, x, y] = values.split(';');
    await draw(x, y);
  }
}

const draw = async (x, y) => {
  const encoder = new TextEncoder();
  await Deno.stdout.write(encoder.encode(`\x1b[${y};${x}H\x1b[44;5;15m \x1b[0m`));
}

const main = async () => {
  enableRawMode();
  await readRawdata();
  disableRawMode();
}

main();