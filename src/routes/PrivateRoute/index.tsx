import React from 'react';

import { Navigate, Outlet } from 'react-router';

interface Props {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<Props> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
