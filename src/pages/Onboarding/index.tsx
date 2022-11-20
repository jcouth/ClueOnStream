import React, { useState } from 'react';

import HowToPlay from 'components/Content/HowToPlay';
import Cam from 'components/Cam';

import * as S from './styles';
import { useAuth } from 'hooks/useAuth';

const Onboarding: React.FC = () => {
  const { loading, invalidState } = useAuth();

  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  return (
    <S.Container>
      <S.Content
        className={isAnimating ? 'animate' : ''}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <S.Aside>
          <span>
            {loading ? (
              <S.Loading />
            ) : (
              invalidState && (
                <S.Wrapper>
                  <S.Title>Ocorreu um erro ao realizar o seu login.</S.Title>
                  <S.Subtitle>Por favor, tente novamente</S.Subtitle>
                </S.Wrapper>
              )
            )}
          </span>
          <Cam lobby />
        </S.Aside>
        <S.Main>
          <HowToPlay />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Onboarding;
