export function sum(...params) {
  return params.reduce((p, n) => p + n, 0);
}
