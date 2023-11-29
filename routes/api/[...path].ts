import { Handler } from "$fresh/server.ts";
import { Hono } from "@hono";


const app: Hono = new Hono().basePath("/api");

app.get("/check", (c) => c.json({ status: "ok" }))

export const handler: Handler = (req) => app.fetch(req);