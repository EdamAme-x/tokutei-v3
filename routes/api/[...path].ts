import { Handler } from "$fresh/server.ts";
import { Hono } from "@hono";


const app: Hono = new Hono().basePath("/api");

const route = app
  .get("/status", (c) => c.jsonT({ status: "ok" }))
  .get("/hello", (c) => c.jsonT({ hello: "world" }));

export const handler: Handler = (req) => app.fetch(req);