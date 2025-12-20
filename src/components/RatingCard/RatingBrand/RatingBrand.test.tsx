import React from "react";
import { render, screen } from "../../../test/testUtils";
import { RatingBrand } from "./RatingBrand";

describe("Rating Brand tests", () => {
  it("renders with default label", () => {
    const { container } = render(<RatingBrand className="custom" />);

    expect(
      screen.getByLabelText("Product Rating by Feefo")
    ).toBeInTheDocument();
    expect(screen.getByText("Product Rating")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("custom");
  });

  it("renders with a custom label", () => {
    render(<RatingBrand label="Service Rating" />);

    expect(
      screen.getByLabelText("Service Rating by Feefo")
    ).toBeInTheDocument();
    expect(screen.getByText("Service Rating")).toBeInTheDocument();
  });
});
