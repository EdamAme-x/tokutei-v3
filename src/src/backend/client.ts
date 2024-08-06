import { hc } from "hono/client";
import type { RouteType } from "@/backend/index.ts";

export const client = hc<RouteType>(
  typeof window !== "undefined" && typeof document !== "undefined" ? window.location.origin : "",
);
