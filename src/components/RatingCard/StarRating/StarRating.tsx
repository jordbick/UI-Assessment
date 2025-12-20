import React from "react";

import { scoreToLabel } from "./StarRatingUtils";
import {
  Container,
  Label,
  Row,
  Cell,
  Star,
  Caption,
} from "./StarRating.styles";

interface Props {
  average: number;
  percent: number;
  outOf?: number;
}

export const StarRating: React.FC<Props> = ({
  average,
  percent,
  outOf = 5,
}) => {
  const boxes = Array.from({ length: outOf });
  const label = scoreToLabel(percent);
  const formattedScore = average.toFixed(1);

  return (
    <Container
      role="img"
      aria-label={`${label}. Rating ${formattedScore} out of ${outOf}`}
    >
      <Label>{label}</Label>
      <Row>
        {boxes.map((_, i) => {
          const fill = Math.max(0, Math.min(1, average - i));
          console.log(fill);
          const fillPct = fill * 100;

          return (
            <Cell key={i} $fillPct={fillPct}>
              <Star aria-hidden />
            </Cell>
          );
        })}
      </Row>
      <Caption>
        {formattedScore} OUT OF {outOf}
      </Caption>
    </Container>
  );
};
