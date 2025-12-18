import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: clamp(14px, 1.2vw, 18px);
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  
  :root {
    --box-size: clamp(1.25rem, 2.5rem, 3rem);
    --box-gap: clamp(0.25rem, 0.6rem, 0.75rem);
    --radius-md: clamp(0.25rem, 0.5rem, 0.75rem);

    --font-scale-4: clamp(1rem, 1.4rem, 1.75rem);
    --font-scale-2: clamp(0.75rem, 1rem, 1.1rem);
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.background};
  }

  /* Make all text-based elements inherit font-family by default */
  *, *::before, *::after {
    font-family: inherit;
  }`;
