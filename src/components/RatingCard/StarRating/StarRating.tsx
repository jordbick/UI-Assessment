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
  value: number;
  outOf?: number;
}

export const StarRating: React.FC<Props> = ({ value, outOf = 5 }) => {
  const score = Math.max(0, Math.min(outOf, value));
  const boxes = Array.from({ length: outOf });
  const percentScore = outOf > 0 ? score / outOf : 0;
  const label = scoreToLabel(percentScore);
  const formattedScore = score.toFixed(1);

  return (
    <Container
      role="img"
      aria-label={`${label}. Rating ${formattedScore} out of ${outOf}`}
    >
      <Label>{label}</Label>

      <Row role="img" aria-label={`Rating ${score} out of ${outOf}`}>
        {boxes.map((_, i) => {
          const fill = Math.max(0, Math.min(1, score - i));
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
