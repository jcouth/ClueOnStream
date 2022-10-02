import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HowToPlay from 'components/HowToPlay';
import Board from 'components/Board';
import InGame from 'pages/InGame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<InGame />}>
          <Route path="game" element={<Board />} />
          <Route path="*" element={<HowToPlay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
