import { ratingsOrder } from "./RatingBarUtils";

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
