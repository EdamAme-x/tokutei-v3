import { Hono } from "hono";

const app = new Hono({
  strict: false
}).basePath("/api");

const kv = await Deno.openKv();

const linkKey = "link";

const routes = app
  .get("/", (c) => {
    return c.text("Hello, World!");
  });

export { app as serverHandler };
export type RouteType = typeof routes;
