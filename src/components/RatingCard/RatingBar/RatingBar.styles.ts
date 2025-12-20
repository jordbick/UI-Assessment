import styled, { css } from "styled-components";
import { StarIcon } from "../StarRating/StarIcon";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--box-gap);
  --label-col: 4.5ch;
  --count-col: 6ch;
  --col-gap: 4px;
  --label-inner-gap: calc(var(--box-gap) / 3);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: var(--label-col) minmax(0, 1fr) var(--count-col);
  align-items: center;
  column-gap: var(--col-gap);
`;

export const RatingLabel = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--label-inner-gap);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--font-scale-2);
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  inline-size: var(--label-col);
  justify-self: end;
  column-gap: var(--col-gap);
`;

export const SmallStar = styled(StarIcon)`
  width: 1em;
  height: 1em;
  color: ${({ theme }) => theme.colors.grey};
  flex-shrink: 0;
  column-gap: var(--col-gap);
`;

export const Bar = styled.div<{ $fillPct: number }>`
  position: relative;
  height: var(--bar-height);
  border-radius: 0;
  overflow: hidden;

  /* Grey track */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.grey};
    z-index: 0;
  }

  /* Yellow fill */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $fillPct }) => $fillPct}%;
    height: 100%;
    background: ${({ theme }) => theme.colors.yellow};
    z-index: 1;
  }
`;

export const CountText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--font-scale-2);
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  text-align: left;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  inline-size: var(--count-col);
  justify-self: end;
`;
