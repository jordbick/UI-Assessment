export function totalFromCounts(counts: Record<number, number>): number {
  return Object.values(counts).reduce(
    (sum, n) => sum + (Number.isFinite(n) ? n : 0),
    0
  );
}

export function ratingsOrder(outOf: number, desc = true): number[] {
  const ratings = Array.from({ length: outOf }, (_, i) => i + 1);
  return desc ? ratings.reverse() : ratings;
}
