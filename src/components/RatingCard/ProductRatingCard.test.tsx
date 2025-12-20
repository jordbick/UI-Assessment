import React from "react";
import { render, screen } from "../../test/testUtils";
import { ProductRatingCard } from "./ProductRatingCard";

jest.mock("./RatingUtils", () => ({
  computeRatingStats: jest.fn(() => ({
    outOf: 5,
    average: 4.2,
    averageAsPercent: 84,
    total: 10,
    safeCounts: { 5: 6, 4: 3, 3: 1 },
  })),
}));

describe("Product Rating Card Test", () => {
  it("renders the product rating card", () => {
    render(<ProductRatingCard counts={{ 5: 6, 4: 3, 3: 1 }} />);

    expect(screen.getByLabelText("Product rating")).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /rating 4\.2 out of 5/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Product Rating")).toBeInTheDocument();
  });
});
