export function createKey() {
  return crypto.randomUUID().replace(/-/g, "");
}
