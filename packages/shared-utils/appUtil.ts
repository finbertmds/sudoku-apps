// appUtil.ts

export function semverLt(a: string, b: string): boolean {
  const parse = (v: string) => v.split('.').map((n) => parseInt(n, 10));
  const [a1, a2 = 0, a3 = 0] = parse(a);
  const [b1, b2 = 0, b3 = 0] = parse(b);

  if (a1 !== b1) return a1 < b1;
  if (a2 !== b2) return a2 < b2;
  return a3 < b3;
}
