import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import InGame from '../pages/InGame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='game' element={<InGame words={[]} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
