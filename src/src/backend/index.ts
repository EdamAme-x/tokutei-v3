import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { JSDOM } from "jsdom";

const app = new Hono({
  strict: false,
}).basePath("/api");

const kv = await (typeof globalThis.Deno === "undefined"
  ? {
    openKv() {
      return null;
    },
  } as unknown as typeof globalThis.Deno
  : globalThis.Deno).openKv();

const linkKey = "link";

app.use(bodyLimit({
  maxSize: 128 * 1024,
}));

const routes = app
  .get("/ogp", async (c) => {
    const url = c.req.query("url");
    if (!url) {
      return c.json({
        error: "url is required",
      }, 400);
    }

    try {
      new URL(url);
    } catch {
      return c.json({
        error: "url is invalid",
      }, 400);
    }

    const resp = await fetch(url, {
      method: "GET",
      headers: c.req.raw.headers,
    });

    if (!resp.ok) {
      return c.json({
        error: "url is invalid",
      }, 400);
    }

    const dom = new JSDOM(await resp.text(), {
      contentType: "text/html",
    });
    const docs = dom.window._document;

    const title = (docs.querySelector("meta[property='og:title']")
      ? docs.querySelector("meta[property='og:title']").getAttribute(
        "content",
      ) as string | null
      : (
        docs.querySelector("title")
          ? docs.querySelector("title").textContent as string | null
          : null
      )) || "";

    const description = (docs.querySelector("meta[property='og:description']")
      ? docs.querySelector("meta[property='og:description']").getAttribute(
        "content",
      ) as string | null
      : (
        docs.querySelector("meta[name='description']")
          ? docs.querySelector("meta[name='description']").getAttribute(
            "content",
          ) as string | null
          : null
      )) || "";

    let image = decodeURIComponent(
      (docs.querySelector("meta[property='og:image']")
        ? docs.querySelector(
          "meta[property='og:image']",
        ).getAttribute("content") as string | null
        : docs.querySelector("link[rel^='icon']")
        ? docs.querySelector("link[rel^='icon']").getAttribute("href")
        : docs.querySelector("meta[itemprop='image']") &&
          docs.querySelector("meta[itemprop='image']").getAttribute(
            "content",
          ) as string | null) ||
        "",
    );

    try {
      new URL(image);
    } catch (_) {
      try {
        image = new URL(url, image).href;
      } catch (_) {
        image = url + image;
      }
    }

    return c.json({
      title,
      description,
      image,
    });
  });

export { app as serverHandler };
export type RouteType = typeof routes;
