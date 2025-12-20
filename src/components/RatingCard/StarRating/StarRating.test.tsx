import React from "react";
import { render, screen } from "../../../test/testUtils";
import { StarRating } from "./StarRating";

// mock scoreToLabel
jest.mock("./StarRatingUtils", () => ({
  scoreToLabel: jest.fn(() => "Excellent"),
}));

describe("Star Rating tests", () => {
  it("renders accessible aria-label", () => {
    const { container } = render(
      <StarRating average={4.55555555} percent={82} />
    );

    // aria-label
    expect(
      screen.getByRole("img", {
        name: "Excellent. Rating 4.6 out of 5",
      })
    ).toBeInTheDocument();
    // Rating label
    expect(screen.getByText("Excellent")).toBeInTheDocument();
    // round to 1 decimal place
    expect(screen.getByText("4.6 OUT OF 5")).toBeInTheDocument();
    const stars = container.querySelectorAll('[aria-hidden="true"]');
    // defaults to 5 stars
    expect(stars.length).toBe(5);
  });

  it("supports a custom outOf value", () => {
    render(<StarRating average={3} percent={60} outOf={3} />);

    // removes .0 from rating
    expect(
      screen.getByRole("img", {
        name: "Excellent. Rating 3 out of 3",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("3 OUT OF 3")).toBeInTheDocument();
  });
});
