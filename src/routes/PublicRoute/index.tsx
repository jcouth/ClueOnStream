import React from 'react';

import { Navigate, Outlet } from 'react-router';

interface Props {
  isAuthenticated: boolean;
  notFound?: boolean;
}

const PublicRoute: React.FC<Props> = ({ isAuthenticated, notFound }) => {
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  if (notFound) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
