import React from "react";

import { RatingCard } from "./RatingCard.styles";
import { StarRating } from "./StarRating/StarRating";
import { RatingBar } from "./RatingBar/RatingBar";
import { RatingBrand } from "./RatingBrand/RatingBrand";
import { computeRatingStats, normaliseCountsAndOutOf } from "./RatingUtils";

type Props = {
  counts: Record<number, number>;
  desc?: boolean;
};

export const ProductRatingCard: React.FC<Props> = ({ counts, desc = true }) => {
  const { outOf, counts: safeCounts } = normaliseCountsAndOutOf(counts);
  const ratingStats = computeRatingStats(safeCounts, outOf);
  return (
    <RatingCard aria-label="Product rating">
      <StarRating outOf={ratingStats.outOf} average={ratingStats.average} percent={ratingStats.averageAsPercent} />
      <RatingBrand />
      <RatingBar
        counts={safeCounts}
        total={ratingStats.total}
        outOf={outOf}
        desc={desc}
      />
    </RatingCard>
  );
};
