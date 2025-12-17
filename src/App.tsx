import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { StarRating } from "./components/RatingCard/StarRating/StarRating";
export default function App() {
  const data = {
    title: "EXCELLENT",
    score: 4.6,
    stars: 4,
    counts: { 5: 952, 4: 171, 3: 55, 2: 14, 1: 40 },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container" style={{ padding: 24 }}>
        <StarRating value={data.score} outOf={5} size={22} />
      </div>
    </ThemeProvider>
  );
}
