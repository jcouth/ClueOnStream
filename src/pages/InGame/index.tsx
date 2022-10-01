import React, { useEffect, useRef, useState } from 'react';

import { Client as ClientTMI } from 'tmi.js';
import { useParams } from 'react-router';

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
import { fetchVerbs } from 'services/words/api';
import { fetchUser } from 'services/twitch/api';

import * as S from './styles';

const AMOUNT_OF_RED_CARDS = 9;
const AMOUNT_OF_BLUE_CARDS = 8;
const MAX_CARDS = 25;

type ParamsProps =
  | {
      access_token?: string;
      scope?: string;
      token_type?: string;
    }
  | Record<string, string | undefined>;

const InGame: React.FC = () => {
  /*
  [ok] título não sair do card
  [ok] animação abrir cards
  [ok] background-image pegar a url do local path
  [ok] manter proporção quando redimensionar
  [ok] onWin
  abrir todo os cards que tiverem a mesma votação
  integrar com a twitch
  
  fonte carregar do local path
  evitar rerender quando redimensionar
  animação transição de layouts
  limpar codigo
  performance
  */
  const params = useParams();

  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [username, setUsername] = useState<string | null>(null);
  const [client, setClient] = useState<ClientTMI | null>(null);

  const [gameStatus, setGameStatus] = useState<Status>(
    Status.WAITING_CONNECTION
  );

  const [team, setTeam] = useState<Team>(Team.RED);
  const [seconds, setSeconds] = useState<number>(60);
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

  const resetGame = () => {
    setTeam(Team.RED);
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
  };

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
      setGameStatus(Status.FINISH_GAME);
      setTeam(nextTeam);
      resetGame();
    } else if (red === 0) {
      setWinner(Team.RED);
      setGameStatus(Status.FINISH_GAME);
      resetGame();
    } else if (blue === 0) {
      setWinner(Team.BLUE);
      setGameStatus(Status.FINISH_GAME);
      resetGame();
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

  const handleConnect = async (token: string) => {
    try {
      const { data } = await fetchUser(token);
      const [userData] = data.data;

      console.log(userData);

      const _client = new ClientTMI({
        // options: { debug: true },
        // identity: {
        //   username: 'ClueOnStream',
        //   password: 'oauth:kt2w01vfqtm6rkmm7b1ru7ra23xvmo',
        // },
        channels: [userData.display_name],
      });

      await _client.connect();

      setUsername(userData.display_name);
      setClient(_client);
      // setGameStatus(Status.WAITING_START);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    // void (async () => {
    //   try {
    //     await client?.disconnect();
    //     // await logout();
    //     setUsername(null);
    //     setClient(null);
    //     setGameStatus(Status.WAITING_CONNECTION);
    //     setSeconds(5);
    //     resetGame();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
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
    if (document.location.hash && document.location.hash !== '') {
      const parsedHash = new URLSearchParams(window.location.hash.slice(1));
      if (parsedHash.get('access_token')) {
        const accessToken = parsedHash.get('access_token');
        const state = parsedHash.get('state');

        console.log(
          '@ClueOnStream::twitch_state',
          localStorage.getItem('@ClueOnStream::twitch_state')
        );

        if (
          accessToken &&
          state === localStorage.getItem('@ClueOnStream::twitch_state')
        ) {
          void handleConnect(accessToken);

          // if (allWords.current.length === 0) {
          //   void getVerbs();
          // }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (client) {
      // console.log(client);
      // const init = async () => {
      //   client.on('message', (channel, tags, message, self) => {
      //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      //     console.log(`${tags['display-name']}: ${message}`);
      //     // // Ignore echoed messages.
      //     // if (self) return;
      //     // if (message.toLowerCase() === '!hello') {
      //     //   // "@alca, heya!"
      //     //   void client.say(channel, `@${tags.username ?? 'teste'}, heya!`);
      //     // }
      //   });
      // };
      // void init();
    }
  }, [client]);

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
            onDisconnect={handleDisconnect}
            onNewGame={handleNewGame}
            onSend={handleSendClue}
          />
        </S.Aside>
        <S.Main>
          {gameStatus === Status.GAME || gameStatus === Status.FINISH_GAME ? (
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
                  <PredictionIcon width="100%" height="4.222vw" fill="white" />,
                  'Entre em uma equipe pelo palpite da live',
                  2
                )}
                {renderTipCard(
                  <BuldIcon width="100%" height="4.222vw" fill="white" />,
                  'Aguarde pela dica e turno da sua equipe',
                  4
                )}
                {renderTipCard(
                  <ChatIcon width="100%" height="4.222vw" fill="white" />,
                  'Digite o que está escrito no card e envie',
                  6
                )}
                {renderTipCard(
                  <OfferIcon width="100%" height="4.222vw" fill="white" />,
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
