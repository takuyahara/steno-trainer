import { type Server } from "bun";
import { find } from "./api";

const fetch = (request: Request, server: Server) => {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/q/")) {
    return new Response("404", {
      status: 404,
    });
  }
  const query = url.pathname.substring(3);
  const queryDecoded = decodeURIComponent(query);
  console.log(queryDecoded);
  const result = find(queryDecoded);
  const json = JSON.stringify(result.slim());
  console.log(json);
  return new Response(json, {
    headers: {
      // "Access-Control-Allow-Origin": "http://localhost:5173",
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

// Bun.serve({
//   fetch,
// });

export default {
  async fetch(request: Request, server: Server) {
    let text = "Hello from Bun on Vercel!\n";

    text += `\nurl: ${request.url}\n`;

    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel")) continue;
      text += `\n${key}: ${value}`;
    }

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
  },
};
