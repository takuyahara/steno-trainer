import { find } from "./api";

Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
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
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  },
});
