import React, { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router';

import Cam from 'components/Cam';

import * as S from './styles';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidState, setInvalidState] = useState<boolean>(false);

  useEffect(() => {
    const init = () => {
      if (document.location.hash && document.location.hash !== '') {
        setLoading(true);

        const parsedHash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = parsedHash.get('access_token');
        if (accessToken) {
          const state = parsedHash.get('state');
          const previousState = localStorage.getItem('@ClueOnStream::state');
          localStorage.removeItem('@ClueOnStream::state');

          if (state === previousState) {
            localStorage.setItem(
              '@ClueOnStream::twitch_access_token',
              accessToken
            );
            navigate('/lobby');
          } else {
            setInvalidState(true);
            setLoading(false);
          }
        } else {
          setInvalidState(true);
          setLoading(false);
        }
      }
    };
    void init();
  }, []);

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
          <Outlet />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Onboarding;
