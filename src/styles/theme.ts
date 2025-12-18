import { typography } from "./typography";

export const AppTheme = {
  colors: {
    background: "#ffffff",
    textPrimary: "#1a1a1a",
    textSecondary: "#6b6b6b",
    grey: "#d9d9d9",
    yellow: "#ffd100",

    track: "#d9d9d9",
    accent: "#ffd100",
  },
  components: {
    starRating: {
      fluid: 'clamp(1rem, 2vw, 1.5rem)',
    },
  },
  typography,
};
