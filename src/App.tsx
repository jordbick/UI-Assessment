import React from "react";
import { ThemeProvider } from "styled-components";
import { AppTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ProductRatingCard } from "./components/RatingCard/ProductRatingCard";
export default function App() {
  const counts = { 5: 952, 4: 171, 3: 55, 2: 14, 1: 40 };

  return (
    <ThemeProvider theme={AppTheme}>
      <GlobalStyle />
      <ProductRatingCard counts={counts} />
    </ThemeProvider>
  );
}
