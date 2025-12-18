import styled, { css } from "styled-components";
import { StarIconWhite } from "./StarIconWhite";

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
  color: ${({ theme }) => theme.colors.textPrimary};
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
`;

export const Cell = styled.div<{ $fillPct: number }>`
  position: relative;
  width: var(--box-size);
  height: var(--box-size);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    z-index: 0;
  }

  /* Grey base box */
  &::before {
    background: ${({ theme }) => theme.colors.grey};
  }

  /* Yellow overlay for the filled portion */
  &::after {
    width: ${({ $fillPct }) => $fillPct}%;
    background: ${({ theme }) => theme.colors.yellow};
  }
`;

export const Star = styled(StarIconWhite)`
  position: relative;
  width: 70%;
  height: 70%;
  color: ${({theme}) => theme.colors.background};
  z-index: 1;
`;
