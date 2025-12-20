import { scoreToLabel } from "./StarRatingUtils";

type Case = {
  norm: number;
  expected: "Exceptional" | "Excellent" | "Good" | "Average" | "Poor";
};

describe("scoreToLabel", () => {
  const cases: Case[] = [
    // Exceptional
    { norm: 0.981, expected: "Exceptional" },
    { norm: 1, expected: "Exceptional" },
    { norm: Number.POSITIVE_INFINITY, expected: "Exceptional" },

    // Excellent
    { norm: 0.98, expected: "Excellent" },
    { norm: 0.9, expected: "Excellent" },
    { norm: 0.8, expected: "Excellent" },

    // Good
    { norm: 0.7999999, expected: "Good" },
    { norm: 0.7, expected: "Good" },
    { norm: 0.6, expected: "Good" },

    // Average
    { norm: 0.5999999, expected: "Average" },
    { norm: 0.45, expected: "Average" },
    { norm: 0.3, expected: "Average" },

    // Poor
    { norm: 0.2999999, expected: "Poor" },
    { norm: 0, expected: "Poor" },
    { norm: -0.01, expected: "Poor" },
    { norm: Number.NaN, expected: "Poor" },
  ];

  test.each(cases)("maps %p to %p", ({ norm, expected }) => {
    expect(scoreToLabel(norm)).toBe(expected);
  });
});
