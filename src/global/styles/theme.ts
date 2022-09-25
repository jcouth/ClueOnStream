import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    team: {
      red: {
        primary: '#C81D25',
        secondary: '#FF5A5F',
        text: '#96161C',
      },
      blue: {
        primary: '#0B3954',
        secondary: '#087E8B',
        text: '#087E8B',
      },
    },
    white: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.25)',
  },
  fonts: {
    primary: {
      family: "'Inter', sans-serif",
      weight: 700,
      size: '16px',
    },
  },
};

export default theme;
