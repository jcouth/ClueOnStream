import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      team: {
        red: {
          primary: string;
          secondary: string;
          text: string;
        };
        blue: {
          primary: string;
          secondary: string;
          text: string;
        };
      };
      white: string;
      shadow: string;
    };
    fonts: {};
  }
}
