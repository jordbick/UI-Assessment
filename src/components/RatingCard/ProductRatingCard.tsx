import React from "react";

import { RatingCard } from "./RatingCard.styles";
import { StarRating } from "./StarRating/StarRating";
import { RatingBar } from "./RatingBar/RatingBar";
import { RatingBrand } from "./RatingBrand/RatingBrand";
import { computeRatingStats } from "./RatingUtils";

type Props = {
  counts: Record<number, number>;
  desc?: boolean;
};

export const ProductRatingCard: React.FC<Props> = ({ counts, desc = true }) => {
  const ratingStats = computeRatingStats(counts);
  return (
    <RatingCard aria-label="Product rating">
      <StarRating
        outOf={ratingStats.outOf}
        average={ratingStats.average}
        percent={ratingStats.averageAsPercent}
      />
      <RatingBrand />
      <RatingBar
        counts={ratingStats.safeCounts}
        total={ratingStats.total}
        outOf={ratingStats.outOf}
        desc={desc}
      />
    </RatingCard>
  );
};
