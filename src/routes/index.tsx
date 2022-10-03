import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Onboarding from 'pages/Onboarding';
import Home from 'pages/Home';
import { PrivateRoutes } from 'utils/PrivateRoutes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
