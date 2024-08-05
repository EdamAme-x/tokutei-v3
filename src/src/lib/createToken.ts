export function createToken() {
  return crypto.randomUUID().replace(/-/g, "");
}
