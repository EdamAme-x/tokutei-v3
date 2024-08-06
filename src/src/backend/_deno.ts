export const _Deno = (typeof globalThis.Deno === "undefined"
    ? {
      openKv() {
        return null;
      },
    } as unknown as typeof globalThis.Deno
    : globalThis.Deno)