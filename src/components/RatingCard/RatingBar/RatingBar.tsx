import React from "react";
import { Container } from "./RatingBar.styles";
import { RatingRow } from "./RatingRow";
import { ratingsOrder, totalFromCounts } from "./RatingBarUtils";

export interface RatingBreakdownProps {
  counts: Record<number, number>;
  outOf?: number;
  desc?: boolean;
}

export const RatingBar: React.FC<RatingBreakdownProps> = ({
  counts,
  outOf = 5,
  desc = true,
}) => {
  const total = totalFromCounts(counts);
  const orderedRatings = ratingsOrder(outOf, desc);

  return (
    <Container
      role="region"
      aria-label={`Rating breakdown (${outOf} stars total). ${total} reviews`}
    >
      {orderedRatings.map((rating) => {
        const count = counts[rating] ?? 0;
        return (
          <RatingRow key={rating} rating={rating} count={count} total={total} />
        );
      })}
    </Container>
  );
};
