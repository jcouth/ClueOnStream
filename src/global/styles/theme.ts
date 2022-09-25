import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    team: {
      red: {
        primary: '#C81D25',
        primary_90: '#C81D25E6',
        secondary: '#FF5A5F',
        secondary_90: '#FF5A5FE6',
        text: '#96161C',
      },
      blue: {
        primary: '#0B3954',
        primary_90: '#0B3954E6',
        secondary: '#087E8B',
        secondary_90: '#087E8BE6',
        text: '#087E8B',
      },
    },
    white: '#FFFFFF',
    white_90: '#FFFFFFE6',
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
