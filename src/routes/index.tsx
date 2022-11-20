import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { Container, Loading } from 'pages/Onboarding/styles';

import PrivateRoute from './PrivateRoute';

const Onboarding = lazy(async () => await import('pages/Onboarding'));
const Streamer = lazy(async () => await import('pages/Streamer'));
const Home = lazy(async () => await import('pages/Home'));

const Router = () => {
  const { loading, token } = useAuth();

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

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
          <Route
            index
            element={
              <PrivateRoute redirectPath="/home" isAuthenticated={!token}>
                <Onboarding />
              </PrivateRoute>
            }
          />

          <Route element={<PrivateRoute isAuthenticated={!!token} />}>
            <Route path="home" element={<Home />} />
            <Route path="streamer" element={<Streamer />} />
          </Route>

          <Route
            path="*"
            element={
              <PrivateRoute redirectPath="/home" isAuthenticated={!token}>
                <Onboarding />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
