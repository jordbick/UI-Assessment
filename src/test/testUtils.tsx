import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { AppTheme } from "../styles/theme";

const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={AppTheme}>{children}</ThemeProvider>
);

export const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
