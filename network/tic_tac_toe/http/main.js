import { createApp } from "./src/server.js";

const main = () => {
  const app = createApp();
  Deno.serve({ port: 8000 }, app.fetch);
}

main();