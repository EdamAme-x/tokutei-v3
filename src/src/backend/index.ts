import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { validator } from "hono/validator";
import { JSDOM } from "jsdom";
import { _Deno } from './_deno';

const app = new Hono({
  strict: false,
}).basePath("/api");

const kv = await _Deno.openKv();

const linkKey = "link";

app.use(bodyLimit({
  maxSize: 128 * 1024,
}));

const routes = app
  .get("/ogp", validator("query",  (value, c) => {

    if (!value.url || typeof value.url !== "string") {
      return c.json({
        error: "URLは必須です。",
      }, 400);
    }

    return {
      url: value.url,
    }
  }), async (c) => {
    const url = c.req.valid("query").url;

    try {
      new URL(url);
    } catch {
      return c.json({
        error: "URLは無効です。",
      }, 400);
    }

    const resp = await fetch(url, {
      method: "GET",
      headers: c.req.raw.headers,
    });

    if (!resp.ok) {
      return c.json({
        error: "リクエストに失敗しました。",
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
    }, 200);
  });

export { app as serverHandler };
export type RouteType = typeof routes;
