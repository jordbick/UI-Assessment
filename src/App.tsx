import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { StarRating } from "./components/RatingCard/Stars/StarRating";
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
        {/* Show it with a fractional value for visual check */}
        <h1 style={{ marginBottom: 8 }}>{data.title}</h1>
        <p style={{ marginTop: 0, color: "#666" }}>
          {data.score} out of 5 (
          {Object.values(data.counts).reduce((a, b) => a + b, 0)} reviews)
        </p>

        <StarRating value={data.score} outOf={5} size={22} />
      </div>
    </ThemeProvider>
  );
}
