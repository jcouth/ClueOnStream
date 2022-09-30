import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InGame from 'pages/InGame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
