
type RatingBand = "Exceptional" | "Excellent" | "Good" | "Average" | "Poor";

export const scoreToLabel = (
  norm: number
): RatingBand => {
  if (norm > 0.98) return "Exceptional";
  if (norm >= 0.8) return "Excellent";
  if (norm >= 0.6) return "Good";
  if (norm >= 0.3) return "Average";
  return "Poor";
};
