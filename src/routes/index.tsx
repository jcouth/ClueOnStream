import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HowToPlay from 'components/HowToPlay';
import InGame from 'pages/InGame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InGame />}>
          <Route index element={<HowToPlay />} />
        </Route>
        <Route path="*" element={<InGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
