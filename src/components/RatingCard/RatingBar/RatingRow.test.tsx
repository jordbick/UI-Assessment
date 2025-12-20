import React from "react";
import { render, screen } from "@testing-library/react";
import { RatingRow } from "./RatingRow";

describe("Rating Row tests", () => {
  it("renders correctly", () => {
    render(<RatingRow rating={4} count={3} total={8} />);

    // rounds the percentage value
    expect(
      screen.getByRole("group", {
        name: "4 stars: 3 reviews (38%)",
      })
    ).toBeInTheDocument();
    // star value
    expect(screen.getByText("4")).toBeInTheDocument();
    // count number
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows 0% when total is zero", () => {
    render(<RatingRow rating={3} count={0} total={0} />);

    expect(
      screen.getByRole("group", {
        name: "3 stars: 0 reviews (0%)",
      })
    ).toBeInTheDocument();
  });
});
