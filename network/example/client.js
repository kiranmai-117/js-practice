const conn = await Deno.connect({
  port: 8000
})

const sendMessage = async (obj) => {
  const encoder = new TextEncoder();
  const data = JSON.stringify(obj);
  await conn.write(encoder.encode(data));
}

const showReply = async () => {
  const buff = new Uint8Array(1024);
  const n = await conn.read(buff);
  console.log(n, buff.slice(0, n));
  const writer = Deno.stdout.writable.getWriter();
  await writer.write(buff.slice(0, n));
  writer.releaseLock();
}

while (true) {
  const obj = { message: prompt(''), closed: false };
  if (obj.message.trim() === 'exit') {
    obj.closed = true;
    await sendMessage(obj);
    break;
  }
  await sendMessage(obj);
  await showReply();
}