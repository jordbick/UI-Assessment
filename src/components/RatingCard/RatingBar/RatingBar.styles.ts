import styled, { css } from "styled-components";
import { StarIcon } from "../StarRating/StarIcon";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--box-gap);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--box-gap);
`;

export const RatingLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: calc(var(--box-gap) / 2);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--font-scale-2);
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

export const SmallStar = styled(StarIcon)`
  width: 1em;
  height: 1em;
  color: ${({ theme }) => theme.colors.grey};
`;

export const Bar = styled.div<{ $fillPct: number }>`
  position: relative;
  height: var(--bar-height);
  border-radius: var(--radius-md);
  overflow: hidden;

  /* Grey track */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.grey};
    border-radius: var(--radius-md);
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
    border-top-left-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
    z-index: 1;

    /* If fully filled, round both ends to match track */
    ${({ $fillPct }) =>
      $fillPct >= 99.9 &&
      css`
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      `}
  }
`;

export const CountText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--font-scale-2);
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  text-align: right;
`;
