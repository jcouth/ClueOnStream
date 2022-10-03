import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import HowToPlay from 'components/Content/HowToPlay';
import Cam from 'components/Cam';
import { useAuth } from 'hooks/useAuth';

import * as S from './styles';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { handleToken } = useAuth();

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
          const state = localStorage.getItem('@ClueOnStream::state');
          const urlState = parsedHash.get('state');
          localStorage.removeItem('@ClueOnStream::state');

          if (state === urlState) {
            handleToken(accessToken);
            navigate('/home');
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
          <HowToPlay />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Onboarding;
