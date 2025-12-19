import React from "react";
import {
  Row,
  RatingLabel,
  SmallStar,
  Bar,
  CountText,
} from "./RatingBar.styles";

export interface RatingBreakdownRowProps {
  rating: number;
  count: number;
  total: number;
}

export const RatingRow: React.FC<RatingBreakdownRowProps> = ({
  rating,
  count,
  total,
}) => {
  const fillPct = total > 0 ? (count / total) * 100 : 0;

  return (
    <Row
      role="group"
      aria-label={`${rating} stars: ${count} reviews (${Math.round(fillPct)}%)`}
    >
      <RatingLabel>
        {rating} <SmallStar aria-hidden />
      </RatingLabel>

      <Bar $fillPct={fillPct} aria-hidden />

      <CountText>{count}</CountText>
    </Row>
  );
};
