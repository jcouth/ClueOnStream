import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Container, Loading } from 'pages/Onboarding/styles';

const Onboarding = lazy(async () => await import('pages/Onboarding'));
const Streamer = lazy(async () => await import('pages/Streamer'));
const Home = lazy(async () => await import('pages/Home'));

const Router = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Container>
            <Loading />
          </Container>
        }
      >
        <Routes>
          <Route path="/" element={<PublicRoute isAuthenticated={!!token} />}>
            <Route index element={<Onboarding />} />
          </Route>
          <Route
            path="/home"
            element={<PrivateRoute isAuthenticated={!!token} />}
          >
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/streamer"
            element={<PrivateRoute isAuthenticated={!!token} />}
          >
            <Route index element={<Streamer />} />
          </Route>
          <Route
            path="*"
            element={<PublicRoute isAuthenticated={!!token} notFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
