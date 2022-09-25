import React from 'react';

import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global/styles/styles';
import theme from './global/styles/theme';

import Router from './routes';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
