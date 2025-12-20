import React from "react";
import { render, screen } from "@testing-library/react";
import { RatingBar } from "./RatingBar";

jest.mock("./RatingRow", () => ({
  RatingRow: ({ rating, count, total }: any) => (
    <div data-testid="rating-row">
      rating:{rating} count:{count} total:{total}
    </div>
  ),
}));

const counts = {
  5: 4,
  4: 3,
  1: 1,
};

const total = 8;
describe("Rating Bar test", () => {
  it("renders correctly", () => {
    render(<RatingBar counts={counts} total={total} />);

    // aria-label
    expect(
      screen.getByRole("region", {
        name: "Rating breakdown (5 stars total). 8 reviews",
      })
    ).toBeInTheDocument();
    const rows = screen.getAllByTestId("rating-row");
    expect(rows).toHaveLength(5);
    expect(screen.getByText("rating:5 count:4 total:8")).toBeInTheDocument();
    expect(screen.getByText("rating:4 count:3 total:8")).toBeInTheDocument();
    expect(screen.getByText("rating:3 count:0 total:8")).toBeInTheDocument();
    expect(screen.getByText("rating:2 count:0 total:8")).toBeInTheDocument();
    expect(screen.getByText("rating:1 count:1 total:8")).toBeInTheDocument();
    // renders in desc order by default
    const ratings = rows.map(
      (row) => row.textContent?.match(/rating:(\d)/)?.[1]
    );
    expect(ratings).toEqual(["5", "4", "3", "2", "1"]);
  });

  it("renders ratings in ascending order when desc is false", () => {
    render(<RatingBar counts={counts} total={total} desc={false} />);

    const rows = screen.getAllByTestId("rating-row");
    const ratings = rows.map(
      (row) => row.textContent?.match(/rating:(\d)/)?.[1]
    );

    expect(ratings).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("supports a custom outOf value", () => {
    render(<RatingBar counts={{ 3: 2 }} total={2} outOf={3} />);

    const rows = screen.getAllByTestId("rating-row");
    expect(rows).toHaveLength(3);

    expect(screen.getByText("rating:3 count:2 total:2")).toBeInTheDocument();
    expect(screen.getByText("rating:2 count:0 total:2")).toBeInTheDocument();
    expect(screen.getByText("rating:1 count:0 total:2")).toBeInTheDocument();
  });
});
