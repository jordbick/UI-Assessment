// RatingCard.styles.ts
import styled from "styled-components";


export const RatingCard = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid color-mix(in srgb, ${({ theme }) =>
    theme.colors.textSecondary} 18%, transparent);
  border-radius: var(--radius-md);
  inline-size: 100%;
  padding-block: clamp(1.25rem, 4vw, 2.5rem);

  display: grid;
  justify-items: center;
  text-align: center;
`;
