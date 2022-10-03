import React from 'react';

import { Navigate, Outlet } from 'react-router';

import { useAuth } from 'hooks/useAuth';

export const PrivateRoutes = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/" />;
};
