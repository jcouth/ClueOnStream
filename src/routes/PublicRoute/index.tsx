import React from 'react';

import { Navigate, Outlet } from 'react-router';

interface Props {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<Props> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
