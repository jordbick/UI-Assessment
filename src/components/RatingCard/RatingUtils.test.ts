import { computeRatingStats } from "./RatingUtils";

describe("computeRatingStats", () => {
  test("returns zeros when outOf = 0 (early return)", () => {
    const counts = { 0: 10 };
    const res = computeRatingStats(counts);
    expect(res).toEqual({
      outOf: 0,
      total: 0,
      average: 0,
      averageAsPercent: 0,
      safeCounts: {},
    });
  });

  test("computes total, average, and percent for a typical 1..5 distribution", () => {
    const counts = { 5: 952, 4: 171, 3: 55, 2: 14, 1: 40 };
    const res = computeRatingStats(counts);
    const expectedTotal = 952 + 171 + 55 + 14 + 40;
    const weightedTotal = 952 * 5 + 171 * 4 + 55 * 3 + 14 * 2 + 40;
    const expectedAverage = weightedTotal / expectedTotal;

    expect(res.total).toBe(expectedTotal);
    expect(res.average).toBe(expectedAverage);
    expect(res.averageAsPercent).toBe(expectedAverage / 5);
    expect(res.safeCounts).toEqual(counts);
    expect(res.outOf).toBe(5);
  });

  test("missing ratings default to 0 in the loop (no crash, correct weighting)", () => {
    const counts = { 5: 2, 3: 4 };
    const res = computeRatingStats(counts);
    const expectedTotal = 2 + 4;
    const weightTotal = 5 * 2 + 3 * 4;
    const expectedAverage = weightTotal / expectedTotal;

    expect(res.total).toBe(6);
    expect(res.average).toBe(expectedAverage);
    expect(res.averageAsPercent).toBe(expectedAverage / 5);
    expect(res.safeCounts).toEqual({ 5: 2, 4: 0, 3: 4, 2: 0, 1: 0 });
  });

  test("all zeros yields average 0 and averageAsPercent 0", () => {
    const counts = { 1: 0, 2: 0, 3: 0 };

    const res = computeRatingStats(counts);
    expect(res.total).toBe(0);
    expect(res.average).toBe(0);
    expect(res.averageAsPercent).toBe(0);
    expect(res.safeCounts).toEqual(counts);
  });

  test("numeric string values normalise to number", () => {
    const counts: Record<number, number> = {
      2: "7" as unknown as number,
      4: 1 as number,
    };

    const res = computeRatingStats(counts);
    const expectedTotal = 8;
    const weightedTotal = 7 * 2 + 4;

    expect(res.total).toBe(expectedTotal);
    expect(res.average).toBe(weightedTotal / expectedTotal);
    expect(res.averageAsPercent).toBe(weightedTotal / expectedTotal / 4);
    expect(res.safeCounts).toEqual({ 4: 1, 3: 0, 2: 7, 1: 0 });
    expect(res.outOf).toBe(4);
  });

  test("NaN or Infinity discounted from count", () => {
    const counts = {
      1: Number.NaN as number,
      2: Number.POSITIVE_INFINITY as number,
      3: 7,
    };

    const res = computeRatingStats(counts);
    expect(res.total).toBe(7);
    expect(res.average).toBe(3);
    expect(res.averageAsPercent).toBe(1);
    expect(res.safeCounts).toEqual({ 1: 0, 2: 0, 3: 7 });
  });

  test("negative counts discounted", () => {
    const counts = { 5: -3 as number, 1: 2 };
    const res = computeRatingStats(counts);

    expect(res.total).toBe(2);
    expect(res.average).toBe(1);
    expect(res.averageAsPercent).toBe(1 / 5);
    expect(res.outOf).toBe(5);
    expect(res.safeCounts).toEqual({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 2 });
  });
});
