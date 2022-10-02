import React, { useState } from 'react';

import { Outlet } from 'react-router';

import Cam from 'components/Cam';

import * as S from './styles';

const Home: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  return (
    <S.Container>
      <S.Content
        className={isAnimating ? 'animate' : ''}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <S.Aside>
          <Cam lobby />
        </S.Aside>
        <S.Main>
          <Outlet />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Home;
