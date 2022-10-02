import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HowToPlay from 'components/HowToPlay';
import Board from 'components/Board';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import InGame from 'pages/InGame';

const Router = () => {
  // const { status } = useGame();

  const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    // if (status !== Status.GAME) {
    //   return <Navigate to="/" />;
    // }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<InGame />}>
          <Route
            path="game"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<HowToPlay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
