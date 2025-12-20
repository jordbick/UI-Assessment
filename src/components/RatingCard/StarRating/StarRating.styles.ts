import styled, { css } from "styled-components";
import { StarIcon } from "./StarIcon";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.div`
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: var(--font-scale-4);
  margin-bottom: var(--box-gap);
`;

export const Caption = styled.div`
  margin-top: var(--box-gap);
  font-weight: 700;
  letter-spacing: 0.06em;
  font-size: var(--font-scale-2);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Row = styled.div`
  display: inline-flex;
  gap: var(--box-gap);
  align-items: center;
  margin: 16px;
`;

export const Cell = styled.div<{ $fillPct: number }>`
  position: relative;
  width: var(--box-size);
  height: var(--box-size);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  /* Grey base box */
  &::before {
    background: ${({ theme }) => theme.colors.grey};
    border-radius: var(--radius-md);
  }

  /* Yellow overlay for the filled portion */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: ${({ $fillPct }) => $fillPct}%;
    height: 100%;
    background: ${({ theme }) => theme.colors.yellow};
    border-top-left-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
    z-index: 0;

    /* If fully filled, round both ends to match base */
    ${({ $fillPct }) =>
      $fillPct >= 99.9 &&
      css`
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      `}
  }
`;

export const Star = styled(StarIcon)`
  position: relative;
  width: 70%;
  height: 70%;
  color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;
