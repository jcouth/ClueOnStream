import React from 'react';

import { Navigate, Outlet } from 'react-router';

interface Props {
  children?: React.ReactElement;
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute: React.FC<Props> = ({
  children,
  isAuthenticated,
  redirectPath = '/',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ?? <Outlet />;
};

export default PrivateRoute;
