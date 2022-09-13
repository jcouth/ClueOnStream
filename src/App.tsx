import React from 'react';

import InGame from './InGame';

import './App.css';

function App() {
  return (
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
      <InGame />
    </div>
  );
}

export default App;
