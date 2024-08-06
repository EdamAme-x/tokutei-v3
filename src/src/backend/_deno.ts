import { openKv } from "@deno/kv";

export const _Deno = {
  // @ts-expect-error NO TYPED
  openKv: typeof Deno === "undefined" ? openKv : Deno
}