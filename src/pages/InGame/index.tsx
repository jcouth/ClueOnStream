import React, { useEffect, useRef, useState } from 'react';

import { Outlet, Routes, Route, useNavigate } from 'react-router';

import Lobby from 'components/Info/Lobby';
import Game from 'components/Info/Game';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import { fetchVerbs } from 'services/words/api';
import { fetchUser, logout } from 'services/twitch/api';

import * as S from './styles';

const InGame: React.FC = () => {
  /*
  [ok] título não sair do card
  [ok] animação abrir cards
  [ok] background-image pegar a url do local path
  [ok] manter proporção quando redimensionar
  [ok] onWin
  [ok] integrar com a twitch
  separar equipes pelo prediction
  pegar votos pelo chat
  attrs
  
  fonte carregar do local path
  evitar rerender quando redimensionar
  animação transição de layouts
  limpar codigo
  performance
  */
  const {
    team,
    amount: { max },
    status,
    handleStatus,
    reset,
    initClient,
  } = useGame();
  const navigate = useNavigate();

  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleConnect = async (token: string) => {
    try {
      localStorage.removeItem('@ClueOnStream::twitch_access_token');
      localStorage.removeItem('@ClueOnStream::twitch_state');
      localStorage.removeItem('@ClueOnStream::state');

      const { data } = await fetchUser(token);
      const [userData] = data.data;

      setToken(token);
      setUsername(userData.display_name);
      handleStatus(Status.WAITING_START);
      initClient(userData.display_name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    void (async () => {
      try {
        await logout(token);

        setUsername(null);
        handleStatus(Status.WAITING_CONNECTION);
        reset();

        navigate('/');
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const handleNewGame = () => {
    try {
      const shuffled = shuffleArray(allWords.current);
      const newWords = shuffled.slice(0, max);

      setWords(newWords);
      handleStatus(Status.WAITING_TEAMS);

      setTimeout(() => {
        handleStatus(Status.GAME);

        navigate('/game');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();

      allWords.current = data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (document.location.hash && document.location.hash !== '') {
      const parsedHash = new URLSearchParams(window.location.hash.slice(1));
      if (parsedHash.get('access_token')) {
        const accessToken = parsedHash.get('access_token');
        const state = parsedHash.get('state');
        localStorage.setItem(
          '@ClueOnStream::twitch_access_token',
          accessToken ?? ''
        );
        localStorage.setItem('@ClueOnStream::twitch_state', state ?? '');
        navigate('/');
      }
    } else {
      const accessToken = localStorage.getItem(
        '@ClueOnStream::twitch_access_token'
      );
      const state = localStorage.getItem('@ClueOnStream::twitch_state');

      if (
        accessToken &&
        state === localStorage.getItem('@ClueOnStream::twitch_state')
      ) {
        void handleConnect(accessToken);

        if (allWords.current.length === 0) {
          void getVerbs();
        }
      }
    }
  }, []);

  return (
    <S.Container>
      <S.Content
        inLobby={status !== Status.GAME}
        team={team}
        className={isAnimating ? 'animate' : ''}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <S.Aside>
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Lobby username={username} />} />
          </Routes>
          <Cam onDisconnect={handleDisconnect} onNewGame={handleNewGame} />
        </S.Aside>
        <S.Main>
          <Outlet context={{ words, username }} />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
