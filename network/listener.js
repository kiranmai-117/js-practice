import { input } from '@inquirer/prompts';

const communicate = async (conn, encoder, decoder) => {
  while (true) {
    const buff = new Uint8Array(1024);
    const n = await conn.read(buff);
    const reply = JSON.parse(decoder.decode(buff.slice(0, n)));
    console.log('>>' + reply.message);
    if (reply.closed) {
      break;
    }
    const msg = input({ message: '' });
    await conn.write(encoder.encode(msg));
  }
}

const handleConnection = async (conn) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  await communicate(conn, encoder, decoder);
  conn.close();
}

const server = async () => {
  const listener = Deno.listen({
    port: 8000,
    transport: 'tcp'
  })
  for await (const conn of listener) {
    handleConnection(conn);
  }
}

server();