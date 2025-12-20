/**
 * Order ratings 1..outOf (desc by default).
 */
export function ratingsOrder(outOf: number, desc = true): number[] {
  const ratings = Array.from({ length: outOf }, (_, i) => i + 1);
  return desc ? ratings.reverse() : ratings;
}
