import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';
import axios from 'axios';

import * as Content from 'components/Content';
import * as Info from 'components/Info';
import Modal from 'components/Modal';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useAuth } from 'hooks/useAuth';
import { useGame } from 'hooks/useGame';
import { Prediction } from 'interfaces/TwitchResponse';
import { Status } from 'interfaces/Status';
import { Team } from 'interfaces/Card';
import { fetchVerbs } from 'services/words/api';
import {
  fetchUser,
  finishPrediction,
  getPrediction,
  logout,
  makePrediction,
} from 'services/twitch/api';

import * as S from './styles';

const PREDICTION_WINDOW = 60;

const Home: React.FC = () => {
  /*

  separar equipes pelo prediction
  finalizar prediction ao acabar a partida (escolher vencedor) ou voltar para o menu (cancelar)
  
  -
  
  popup para o streamer saber os cards de cada time
  
  */
  const navigate = useNavigate();
  const { token, authenticated, handleAuthenticated, resetAuth } = useAuth();
  const {
    team,
    amount: { max },
    status,
    winner,
    handleStatus,
    reset,
    initClient,
    resetClient,
  } = useGame();

  const timerRef = useRef<NodeJS.Timeout>();
  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [gameNotAvailable, setGameNotAvailable] = useState<boolean>(false);

  const handleConnect = async () => {
    try {
      const { data } = await fetchUser(token);
      const [userData] = data.data;

      handleAuthenticated(true);
      setId(userData.id);
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
        resetAuth();

        localStorage.removeItem('@ClueOnStream::cards');
        setId(null);
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
    if (id) {
      reset();

      const shuffled = shuffleArray(allWords.current);
      const newWords = shuffled.slice(0, max);

      setWords(newWords);
      handleStatus(Status.WAITING_TEAMS);

      void (async () => {
        try {
          const { data } = await makePrediction(token, {
            id,
            title: 'Escolha uma equipe para jogar ClueOnStream',
            outcomes: [
              { id: 'red_team', title: 'Equipe vermelha', color: 'RED' },
              { id: 'blue_team', title: 'Equipe azul', color: 'BLUE' },
            ],
            prediction_window: PREDICTION_WINDOW,
          });
          setPrediction(data.data[0]);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
              case 400:
              case 403:
                setGameNotAvailable(true);
                handleStatus(Status.WAITING_START);
                break;
            }
          }
        }
      })();
    }
  };

  const handleBackToLobby = () => {
    if (id && prediction && winner) {
      void (async () => {
        localStorage.removeItem('@ClueOnStream::cards');
        resetClient();

        await finishPrediction(token, {
          id,
          winning_outcome_id: winner === Team.RED ? 'red_team' : 'blue_team',
        });

        setPrediction(null);
        setIsModalVisible(false);
        handleStatus(Status.WAITING_START);
        reset();
      })();
    } else {
      console.log('não tem id, prediction ou winner');
      localStorage.removeItem('@ClueOnStream::cards');
      resetClient();
      setIsModalVisible(false);
      handleStatus(Status.WAITING_START);
      reset();
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
      if (!authenticated && token) {
        void handleConnect();

        if (allWords.current.length === 0) {
          void getVerbs();
        }
      }
    };
    void connect();
  }, []);

  useEffect(() => {
    if (prediction && id) {
      timerRef.current = setInterval(() => {
        void (async () => {
          const { data } = await getPrediction(token, id);
          const [current] = data.data;
          if (current.status === 'LOCKED') {
            clearTimeout(timerRef.current);
            handleStatus(Status.GAME);
          } else if (
            current.status === 'CANCELED' ||
            current.status === 'RESOLVED'
          ) {
            clearTimeout(timerRef.current);
            handleStatus(Status.WAITING_START);
          }
        })();
      }, PREDICTION_WINDOW / 10);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [prediction]);

  useEffect(() => {
    const clearCardsOnStorage = () => {
      localStorage.removeItem('@ClueOnStream::cards');
    };

    window.addEventListener('beforeunload', clearCardsOnStorage);

    return () =>
      window.removeEventListener('beforeunload', clearCardsOnStorage);
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
          {gameNotAvailable ? (
            <S.ErrorWrapper>
              <S.ErrorTitle>Desculpe pelo inconveniente 😫</S.ErrorTitle>
              <S.ErrorSubtitle>
                Parece que você não possui a opção de palpite (/prediction)
                disponível no seu canal, sendo assim, não será possível separar
                as equipes para iniciar o jogo
              </S.ErrorSubtitle>
            </S.ErrorWrapper>
          ) : status === Status.GAME || status === Status.FINISH_GAME ? (
            <Info.Game />
          ) : (
            <Info.Lobby username={username} />
          )}
          <Cam
            onNewGame={handleNewGame}
            onDisconnect={handleDisconnect}
            onBackToLobby={() => setIsModalVisible(true)}
          />
        </S.Aside>
        <S.Main>
          {status === Status.GAME || status === Status.FINISH_GAME ? (
            <>
              <Modal
                isVisible={isModalVisible}
                title="Você tem certeza?"
                subtitle="Ao confirmar, a partida será !cancelada! e os pontos serão devolvidos para os usuários"
                onCancel={() => setIsModalVisible(false)}
                onConfirm={handleBackToLobby}
              />
              <Content.Board words={words} />
            </>
          ) : (
            <Content.HowToPlay />
          )}
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default Home;
