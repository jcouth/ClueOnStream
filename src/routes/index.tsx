import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HowToPlay from 'components/HowToPlay';
import Board from 'components/Board';
import InGame from 'pages/InGame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InGame />}>
          <Route index element={<HowToPlay />} />
          <Route path="/game" element={<Board />} />
        </Route>
        <Route path="*" element={<InGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
