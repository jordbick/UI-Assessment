import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "styled-components";
import { AppTheme } from "../src/styles/theme";
import { GlobalStyle } from "../src/styles/GlobalStyle";

export default {
  decorators: [
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
      GlobalStyles: GlobalStyle,
      themes: { App: AppTheme },
      defaultTheme: "App",
    }),
  ],
};
