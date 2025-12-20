import {
  normaliseCountsAndOutOf,
  ratingsOrder,
  computeRatingStats,
} from "./RatingUtils";

describe("normaliseCountsAndOutOf", () => {
  test("returns outOf=0 and empty counts for empty input", () => {
    const res = normaliseCountsAndOutOf({});
    expect(res).toEqual({ outOf: 0, counts: {} });
  });

  test("basic happy path: dense keys 1..max retained, values unchanged", () => {
    const input = { 5: 952, 4: 171, 3: 55, 2: 14, 1: 40 };
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(5);
    expect(res.counts).toEqual({
      1: 40,
      2: 14,
      3: 55,
      4: 171,
      5: 952,
    });
  });

  test("missing keys between 1..max are filled with 0", () => {
    const input = { 6: 2, 5: 1, 3: 4 };
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(6);
    expect(res.counts).toEqual({
      1: 0,
      2: 0,
      3: 4,
      4: 0,
      5: 1,
      6: 2,
    });
  });

  test("ignores negative keys and zero key; clamps negative values to 0", () => {
    const input = { [-1]: 10, 0: 5, 2: 3, 4: -13 } as unknown as Record<
      number,
      number
    >;
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(4);
    expect(res.counts).toEqual({
      1: 0,
      2: 3,
      3: 0,
      4: 0, // -13 -> 0
    });
  });

  test('ignores non-integer keys (e.g., 1.5, "7.2")', () => {
    const input = { 1.5: 2, ["7.2" as unknown as number]: 3, 2: 4 } as any;
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(2);
    expect(res.counts).toEqual({
      1: 0,
      2: 4,
    });
  });

  test("coerces value-like inputs: numeric strings become numbers, NaN-like -> 0", () => {
    const input = {
      2: "7" as unknown as number,
      4: "abc" as unknown as number,
      1: Number.NaN as unknown as number,
      3: Infinity as unknown as number,
    };
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(4);
    expect(res.counts).toEqual({
      1: 0, // NaN -> 0
      2: 7, // "7" -> 7
      3: 0, // Infinity -> 0
      4: 0, // "abc" -> NaN -> 0
    });
  });

  test("when only invalid keys are present, returns outOf=0 and empty counts", () => {
    const input = { 0: 1, [-2]: 3, ["1.1" as unknown as number]: 5 } as any;
    const res = normaliseCountsAndOutOf(input);
    expect(res).toEqual({ outOf: 0, counts: {} });
  });

  test("large gaps are filled with zeros up to max key", () => {
    const input = { 10: 1 };
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(10);
    // All from 1..10; only 10 has a 1
    for (let i = 1; i <= 10; i++) {
      expect(res.counts[i]).toBe(i === 10 ? 1 : 0);
    }
  });

  test("values are floored (3.9 -> 3) after coercion and non-negative check", () => {
    const input = { 3: 3.9 as unknown as number, 2: -2.1 as unknown as number };
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(3);
    expect(res.counts).toEqual({
      1: 0,
      2: 0, // negative -> 0
      3: 3, // floored
    });
  });

  test("string keys that parse to integers are accepted; non-integer strings are rejected", () => {
    const input = { "4": 2, "5.0": 3, "5.1": 7 } as any;
    const res = normaliseCountsAndOutOf(input);
    expect(res.outOf).toBe(5); // "5.0" -> 5 as integer
    expect(res.counts).toEqual({
      1: 0,
      2: 0,
      3: 0,
      4: 2,
      5: 3,
    });
  });
});

describe("totalFromCounts", () => {
  test("sums non-negative integers normally", () => {
    const counts = { 1: 1, 2: 2, 3: 3 };
    expect(computeRatingStats(counts)).toBe(6);
  });

  test("clamps negatives and non-finite to 0 before summing", () => {
    const counts = {
      1: -1 as any,
      2: Number.NaN as unknown as number,
      3: Infinity as unknown as number,
      4: 4.7 as any,
    };
    expect(computeRatingStats(counts)).toBe(4); // -1/NaN/Infinity -> 0; 4.7 -> 4
  });

  test("works with empty object", () => {
    expect(computeRatingStats({})).toBe(0);
  });
});

describe("ratingsOrder", () => {
  test("returns [outOf..1] when desc = true (default)", () => {
    expect(ratingsOrder(5)).toEqual([5, 4, 3, 2, 1]);
  });

  test("returns [1..outOf] when desc = false", () => {
    expect(ratingsOrder(4, false)).toEqual([1, 2, 3, 4]);
  });

  test("returns empty array when outOf = 0", () => {
    expect(ratingsOrder(0)).toEqual([]);
  });
});
