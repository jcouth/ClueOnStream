import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import * as Aside from 'components/Aside';
import * as Main from 'components/Main';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import { fetchUser, logout } from 'services/twitch/api';
import { fetchVerbs } from 'services/words/api';

import * as S from './styles';

const Home: React.FC = () => {
  /*
  [ok] título não sair do card
  [ok] animação abrir cards
  [ok] background-image pegar a url do local path
  [ok] manter proporção quando redimensionar
  [ok] onWin
  [ok] integrar com a twitch
  [ok] pegar votos pelo chat
  [ok] attrs
  separar equipes pelo prediction
  
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
    resetClient,
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
        resetClient();
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
    const connect = () => {
      const accessToken = localStorage.getItem(
        '@ClueOnStream::twitch_access_token'
      );

      if (accessToken) {
        void handleConnect(accessToken);

        if (allWords.current.length === 0) {
          void getVerbs();
        }
      }
    };
    void connect();
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
          {status === Status.GAME ? (
            <Aside.Game />
          ) : (
            <Aside.Lobby username={username} />
          )}
          <Cam onDisconnect={handleDisconnect} onNewGame={handleNewGame} />
        </S.Aside>
        <S.Main>
          {status === Status.GAME ? (
            <Main.Board words={words} />
          ) : (
            <Main.HowToPlay />
          )}
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Home;
