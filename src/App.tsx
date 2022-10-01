import React from 'react';

import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'global/styles/styles';
import theme from 'global/styles/theme';
import { GameProvider } from 'hooks/useGame';

import Router from './routes';

import './App.css';

function App() {
  return (
    <GameProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </GameProvider>
  );
}

export default App;
