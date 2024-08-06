import { hc } from "hono/client";
import type { RouteType } from "@/backend/index.ts";

export const client = hc<RouteType>(
  typeof window !== "undefined" ? window.location.origin : "",
);
