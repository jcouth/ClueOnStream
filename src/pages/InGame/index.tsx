import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as PredictionIcon } from 'assets/prediction.svg';
import { ReactComponent as BuldIcon } from 'assets/bulb.svg';
import { ReactComponent as ChatIcon } from 'assets/chat.svg';
import { ReactComponent as OfferIcon } from 'assets/offer.svg';
import Info, { HistoryProps } from 'components/Info';
import Board from 'components/Board';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { ClueProps } from 'interfaces/Clue';
import { Status } from 'interfaces/Status';
import { Team } from 'interfaces/Card';
import { fetchVerbs } from 'services/api';

import * as S from './styles';

const AMOUNT_OF_RED_CARDS = 9;
const AMOUNT_OF_BLUE_CARDS = 8;
const MAX_CARDS = 25;

const InGame: React.FC = () => {
  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [username, setUsername] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<Status>(
    Status.WAITING_CONNECTION
  );

  const [team, setTeam] = useState<Team>(Team.RED);
  const [seconds, setSeconds] = useState<number>(90);
  const [clue, setClue] = useState<ClueProps | null>(null);
  const [winner, setWinner] = useState<Team | null>(null);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryProps>({
    remaining: {
      red: AMOUNT_OF_RED_CARDS,
      blue: AMOUNT_OF_BLUE_CARDS,
    },
    clues: [],
  });

  const handleOnFinishTurn = (
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ) => {
    setIsStreamerTurn(true);
    let {
      remaining: { red, blue },
    } = history;
    const nextTeam = team === Team.RED ? Team.BLUE : Team.RED;

    if (team === Team.RED) {
      red -= cardsOpened;
      blue -= openedOtherTeam;
    } else {
      red -= openedOtherTeam;
      blue -= cardsOpened;
    }

    if (isGameOver) {
      setWinner(nextTeam);
      setTeam(nextTeam);
    } else if (red === 0) {
      setWinner(Team.RED);
    } else if (blue === 0) {
      setWinner(Team.BLUE);
    } else {
      setTeam(nextTeam);
    }

    setHistory((oldState) => ({
      remaining: {
        red,
        blue,
      },
      clues: [
        ...oldState.clues,
        {
          team,
          description: clue!.description,
          amount: clue!.amount,
        },
      ],
    }));
    setClue(null);
  };

  const handleConnect = () => {
    try {
      // ADD loading
      setGameStatus(Status.WAITING_START);
      setUsername('jCouth');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    try {
      // ADD loading
      setGameStatus(Status.WAITING_CONNECTION);
      setUsername(null);

      setTeam(Team.RED);
      setSeconds(90);
      setClue(null);
      setWinner(null);
      setIsStreamerTurn(true);
      setIsTimerRunning(false);
      setHistory({
        remaining: {
          red: AMOUNT_OF_RED_CARDS,
          blue: AMOUNT_OF_BLUE_CARDS,
        },
        clues: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewGame = () => {
    try {
      // ADD loading

      const shuffled = shuffleArray(allWords.current);
      const newWords = shuffled.slice(0, MAX_CARDS);

      setWords(newWords);
      setGameStatus(Status.WAITING_TEAMS);

      setTimeout(() => {
        setGameStatus(Status.GAME);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnFinishTimer = () => {
    setIsTimerRunning(false);
  };

  const handleSendClue = (description: string, amount: number) => {
    setClue({
      description,
      amount,
    });
    setIsStreamerTurn(false);
    setIsTimerRunning(true);
  };

  const handleChangeSeconds = (newSeconds: number) => {
    setSeconds(newSeconds);
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
    if (allWords.current.length === 0) {
      void getVerbs();
    }
  }, []);

  const renderTipCard = (
    icon: React.ReactNode,
    title: string,
    index: number
  ) => (
    <S.TipCard delay={index}>
      <S.TipCardButtons>
        <span />
        <span />
        <span />
        <span />
      </S.TipCardButtons>
      {icon}
      <S.TipText>{title}</S.TipText>
    </S.TipCard>
  );

  return (
    <S.Container>
      <S.Content inLobby={gameStatus !== Status.GAME} team={team}>
        <S.Aside>
          <Info
            isStreamerTurn={isStreamerTurn}
            team={team}
            history={history}
            type={gameStatus}
            username={username}
            seconds={seconds}
            onFinishTimer={handleOnFinishTimer}
            onChangeSeconds={handleChangeSeconds}
          />
          <Cam
            type={gameStatus}
            isStreamerTurn={isStreamerTurn}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onNewGame={handleNewGame}
            onSend={handleSendClue}
          />
        </S.Aside>
        <S.Main>
          {gameStatus === Status.GAME ? (
            <Board
              winner={winner}
              amountOfRedCards={AMOUNT_OF_RED_CARDS}
              amountOfBlueCards={AMOUNT_OF_BLUE_CARDS}
              team={team}
              clue={clue}
              words={words}
              isTimerRunning={isTimerRunning}
              onFinishTurn={handleOnFinishTurn}
            />
          ) : (
            <S.HowToPlay>
              <S.Title>Como jogar</S.Title>
              <S.TipsToPlay>
                {renderTipCard(
                  <PredictionIcon width="100%" height="64px" fill="white" />,
                  'Entre em uma equipe pelo palpite da live',
                  2
                )}
                {renderTipCard(
                  <BuldIcon width="100%" height="64px" fill="white" />,
                  'Aguarde pela dica e turno da sua equipe',
                  4
                )}
                {renderTipCard(
                  <ChatIcon width="100%" height="64px" fill="white" />,
                  'Digite o que está escrito no card e envie',
                  6
                )}
                {renderTipCard(
                  <OfferIcon width="100%" height="64px" fill="white" />,
                  'Serão abertos os cards com maiores % de votos',
                  8
                )}
              </S.TipsToPlay>
            </S.HowToPlay>
          )}
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
