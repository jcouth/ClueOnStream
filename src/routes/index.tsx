import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Onboarding from 'pages/Onboarding';
import Streamer from 'pages/Streamer';
import Home from 'pages/Home';
import { PrivateRoutes } from 'utils/PrivateRoutes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Onboarding />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/streamer" element={<Streamer />} />
        {/* <Route index element={<Streamer />} />
        </Route> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
