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
    /* Scales between 20px and 48px, fluidly following vmin */
    --box-size: clamp(20px, 3vmin, 48px);
    --box-gap: clamp(4px, 0.8vmin, 10px);
    --radius-md: clamp(4px, 0.8vmin, 8px);

    --font-scale-4: clamp(16px, 2.0vmin, 22px);
    --font-scale-2: clamp(12px, 1.4vmin, 16px);
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
