import React from "react";

import styled, { css, useTheme } from "styled-components";
import { theme } from "../../../styles/theme";
import { StarIconWhite } from "./StarIconWhite";

interface Props {
  value: number;
  outOf?: number;
  size?: number;
}

const useDefaults = (theme: any) => ({
  cellSize: theme?.components?.starRating?.size ?? 24, // px square per box
  gap: theme?.components?.starRating?.gap ?? 4, // px between boxes
  yellow: theme?.colors?.yellow ?? "#ffd100", // filled color
  grey: theme?.colors?.grey ?? "#d9d9d9", // unfilled color
  radius: theme?.radii?.md ?? 6, // box corner radius
});

const Row = styled.div<{ $gap: number }>`
  display: inline-flex;
  gap: ${({ $gap }) => $gap}px;
  align-items: center;
`;

const Cell = styled.div<{
  $size: number;
  $radius: number;
  $grey: string;
  $yellow: string;
  $fillPct: number;
}>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $radius }) => $radius}px;

  
  /* Center the star inside the box */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Grey rounded box (base) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $grey }) => $grey};
    border-radius: ${({ $radius }) => $radius}px;
    z-index: 0;
  }

  /* Yellow overlay for the filled portion of THIS box */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $fillPct }) => $fillPct}%;
    height: 100%;
    background: ${({ $yellow }) => $yellow};
    border-top-left-radius: ${({ $radius }) => $radius}px;
    border-bottom-left-radius: ${({ $radius }) => $radius}px;
    z-index: 0;

    /* If fully filled, round both ends to match ::before */
    ${({ $fillPct, $radius }) =>
      $fillPct >= 99.9 &&
      css`
        border-top-right-radius: ${$radius}px;
        border-bottom-right-radius: ${$radius}px;
      `}
  }
`;

const Star = styled(StarIconWhite)<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size * 0.7}px;
  height: ${({ $size }) => $size * 0.7}px;
  color: #fff;
  z-index: 1;
`;

export const StarRating: React.FC<Props> = ({ value, outOf = 5 }) => {
  const { cellSize, gap, yellow, grey, radius } = useDefaults(theme);

  const safe = Math.max(0, Math.min(outOf, value));
  const boxes = Array.from({ length: outOf });

  return (
    <Row $gap={gap} role="img" aria-label={`Rating ${safe} out of ${outOf}`}>
      {boxes.map((_, i) => {
        const fill = Math.max(0, Math.min(1, safe - i));
        const fillPct = fill * 100;

        return (
          <Cell
            key={i}
            $size={cellSize}
            $radius={radius}
            $grey={grey}
            $yellow={yellow}
            $fillPct={fillPct}
          >
            <Star $size={cellSize} aria-hidden />
          </Cell>
        );
      })}
    </Row>
  );
};
