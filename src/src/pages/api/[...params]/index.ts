import type { APIRoute } from "astro";
import { serverHandler } from "@/backend/index.ts";

export const GET: APIRoute = async ({ params, request }) => {
  return serverHandler.fetch(request, params);
};

export const POST: APIRoute = async ({ params, request }) => {
  return serverHandler.fetch(request, params);
};
