/**
 * Coerces to a non-negative integer. Non-finite/NaN/negatives -> 0
 */
const asNonNegativeInt = (n: unknown): number => {
  const x = Number(n);
  return Number.isFinite(x) && x >= 0 ? Math.floor(x) : 0;
};

/**
 * From an arbitrary `Record<number, number>`
 * - find the largest positive integer key (this becomes `outOf`)
 * - ignore invalid keys (non-integers, <= 0)
 * - coerce values to non-negative ints
 * - produce a fully normalized counts object with *all* keys from 1..outOf present
 *
 * If there are no valid positive keys, returns outOf = 0 and counts = {}.
 */
export function normaliseCountsAndOutOf(counts: Record<number, number>): {
  outOf: number;
  counts: Record<number, number>;
} {
  let maxKey = 0;
  const tmp: Record<number, number> = {};

  for (const [k, v] of Object.entries(counts)) {
    const key = Number(k);
    // keep only integer keys >= 1
    if (Number.isInteger(key) && key >= 1) {
      const value = asNonNegativeInt(v);
      tmp[key] = (tmp[key] ?? 0) + value; // in case of duplicate stringified keys, sum them
      if (key > maxKey) maxKey = key;
    }
  }

  if (maxKey === 0) {
    // No valid positive rating keys at all
    return { outOf: 0, counts: {} };
  }

  // Pass 2: build a dense map 1..outOf with zeros for missing
  const normalized: Record<number, number> = {};
  for (let rating = 1; rating <= maxKey; rating += 1) {
    normalized[rating] = asNonNegativeInt(tmp[rating] ?? 0);
  }

  return { outOf: maxKey, counts: normalized };
}

/**
 * Calculates the average score and percentage
 */
export function computeRatingStats(
  counts: Record<number, number>,
  outOf: number
): {
  outOf: number;
  total: number;
  average: number;
  averageAsPercent: number;
} {
  const total = Object.values(counts).reduce(
    (sum, n) => sum + asNonNegativeInt(n),
    0
  );

  let weightedTotal = 0;

  if (outOf === 0) {
    // No valid keys
    return {
      outOf: 0,
      total: 0,
      average: 0,
      averageAsPercent: 0,
    };
  }

  for (let rating = 1; rating <= outOf; rating += 1) {
    const count = counts[rating] ?? 0;
    const weight = rating * count;
    weightedTotal += weight;
  }

  const average = total > 0 ? weightedTotal / total : 0;
  const averageAsPercent = outOf > 0 ? average / outOf : 0;

  return {
    outOf,
    total,
    average,
    averageAsPercent,
  };
}

/**
 * Order ratings 1..outOf (desc by default).
 */
export function ratingsOrder(outOf: number, desc = true): number[] {
  const ratings = Array.from({ length: outOf }, (_, i) => i + 1);
  return desc ? ratings.reverse() : ratings;
}
