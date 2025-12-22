import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  RatingLabel,
  SmallStar,
  Bar,
  CountText,
} from "./RatingBar.styles";

interface RatingRowProps {
  rating: number;
  count: number;
  total: number;
}

export const RatingRow: React.FC<RatingRowProps> = ({
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

RatingRow.propTypes = {
  rating: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
