import "styled-components";
import { AppTheme } from "./styles/theme";

declare module "styled-components" {
  type AppTheme = typeof AppTheme;
  export interface DefaultTheme extends AppTheme {}
}
