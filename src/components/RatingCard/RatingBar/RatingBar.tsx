import React from "react";
import { Container } from "./RatingBar.styles";
import { RatingRow } from "./RatingRow";
import { ratingsOrder } from "./RatingBarUtils";

interface RatingBreakdownProps {
  counts: Record<number, number>;
  total: number;
  outOf?: number;
  desc?: boolean;
}

export const RatingBar: React.FC<RatingBreakdownProps> = ({
  counts,
  total,
  outOf = 5,
  desc = true,
}) => {
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
