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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          width: '100vw',
          height: '100vh',

          backgroundColor: '#A37B73',
        }}
      >
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
