import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#27233A',
    secondary: '#505168',
    team: {
      red: {
        primary: '#C81D25',
        primary_90: '#C81D25E6',
        secondary: '#FF5A5F',
        secondary_90: '#FF5A5FE6',
      },
      blue: {
        primary: '#0B3954',
        primary_90: '#0B3954E6',
        secondary: '#087E8B',
        secondary_90: '#087E8BE6',
      },
    },
    card: {
      normal: {
        primary: '#E59F71',
        secondary: '#BA5A31',
        text: '#000000',
      },
      gameOver: {
        primary: '#191919',
        secondary: '#242424',
        text: '#FFFFFF',
      },
    },
    white: '#FFFFFF',
    white_90: '#FFFFFFE6',
    black: '#000000',
    shadow: 'rgba(0, 0, 0, 0.25)',
  },
  fonts: {
    primary: {
      family: "'Inter', sans-serif",
      weight: 700,
      size: '16px',
      title: '24px',
      subtitle: '20px',
    },
  },
};

export default theme;
