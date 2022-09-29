import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InGame from '@pages/InGame';
import Home from '@pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game" element={<InGame words={[]} seconds={5} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
