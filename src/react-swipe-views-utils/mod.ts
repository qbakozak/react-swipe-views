// Extended version of % with negative integer support.
export const mod = (n: number, m: number) => {
  const q = n % m
  return q < 0 ? q + m : q
}
