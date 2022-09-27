import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      team: {
        red: {
          primary: string;
          primary_90: string;
          secondary: string;
          secondary_90: string;
        };
        blue: {
          primary: string;
          primary_90: string;
          secondary: string;
          secondary_90: string;
        };
      };
      card: {
        normal: {
          primary: string;
          secondary: string;
          text: string;
        };
        gameOver: {
          primary: string;
          secondary: string;
          text: string;
        };
      };
      white: string;
      white_90: string;
      black: string;
      shadow: string;
    };
    fonts: {
      primary: {
        family: string;
        weight: string | number;
        size: string;
        title: string;
        subtitle: string;
      };
    };
  }
}
