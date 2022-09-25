import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      teamRed: {
        primary: string;
        secondary: string;
        text: string;
      };
      teamBlue: {
        primary: string;
        secondary: string;
        text: string;
      };
    };
    fonts: {};
  }
}
