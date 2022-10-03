import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import * as Content from 'components/Content';
import * as Info from 'components/Info';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import { fetchUser, logout } from 'services/twitch/api';
import { fetchVerbs } from 'services/words/api';

import * as S from './styles';

const Home: React.FC = () => {
  /*
  estilo do card não descoberto
  
  -

  modal de confirmação [voltar]
  
  -

  separar equipes pelo prediction
  finalizar prediction ao acabar a partida (escolher vencedor) ou voltar para o menu (cancelar)
  
  -
  
  usuário do chat ter voto único (se já tiver votado, alterar o voto e diminuir do card antigo)
  
  -

  popup para o streamer saber qual os cards de cada time
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
        handleStatus(Status.WAITING_START);
        reset();

        navigate('/');
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const handleNewGame = () => {
    try {
      reset();

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

  const handleBackToLobby = () => {
    handleStatus(Status.WAITING_START);
    reset();
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
        inLobby={status !== Status.GAME && status !== Status.FINISH_GAME}
        team={team}
        className={isAnimating ? 'animate' : ''}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <S.Aside>
          {status === Status.GAME || status === Status.FINISH_GAME ? (
            <Info.Game />
          ) : (
            <Info.Lobby username={username} />
          )}
          <Cam
            onNewGame={handleNewGame}
            onDisconnect={handleDisconnect}
            onBackToLobby={handleBackToLobby}
          />
        </S.Aside>
        <S.Main>
          {status === Status.GAME || status === Status.FINISH_GAME ? (
            <Content.Board words={words} />
          ) : (
            <Content.HowToPlay />
          )}
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Home;
