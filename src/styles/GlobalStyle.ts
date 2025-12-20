import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --box-size: clamp(1.25rem, 3.2rem, 4.5rem);
    --box-gap: 2px;
    --brand-gap: 10px;
    --radius-md: clamp(0.25rem, 0.5rem, 0.75rem);
    --bar-height: clamp(0.5rem, 0.6rem, 0.75rem);

    --font-scale-4: clamp(1rem, 1.4rem, 1.75rem);
    --font-scale-2: clamp(0.75rem, 1rem, 1.1rem);
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.background};
  }

  /* Make all text-based elements inherit font-family by default */
  *, *::before, *::after {
    font-family: inherit;
  }`;
