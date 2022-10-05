import React, { useCallback, useEffect, useRef, useState } from 'react';

import { shuffleArray } from 'helpers/shuffleArray';
import { OnMessageCallback, useGame } from 'hooks/useGame';
import useCrossTabState from 'hooks/useCrossTabState';
import { CardProps, CardType, ObjectCardProps, Team } from 'interfaces/Card';
import { Status } from 'interfaces/Status';

import * as S from './styles';
import Card from './Card';

interface VoteProps {
  [key: string]: CardProps['title'];
}

interface Props {
  words: string[];
}

const Board: React.FC<Props> = ({ words }) => {
  const game = useGame();

  const votes = useRef<VoteProps>({});

  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<ObjectCardProps>({});
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animateTitle, setAnimateTitle] = useState<boolean>(false);

  const [_, setCrossCards] = useCrossTabState<ObjectCardProps>('cards', {});

  //

  const disconnectClient = () => {
    // void (async () => {
    //   try {
    //     await client?.disconnect();
    //     setClient(null);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  };

  //

  const handleOpenAllCards = () => {
    setCards((oldState) =>
      Object.entries(oldState).reduce<ObjectCardProps>(
        (previous, [title, card]) => ({
          ...previous,
          [title]: {
            ...card,
            isOpen: true,
            votes: 0,
          },
        }),
        {}
      )
    );
  };

  const handleOnFinishTurn = (
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ) => {
    game.handleIsStreamerTurn(true);
    let {
      remaining: { red, blue },
    } = game.history;
    const nextTeam = game.team === Team.RED ? Team.BLUE : Team.RED;

    if (game.team === Team.RED) {
      red -= cardsOpened;
      blue -= openedOtherTeam;
    } else {
      red -= openedOtherTeam;
      blue -= cardsOpened;
    }

    game.handleHistory((oldState) => ({
      remaining: {
        red,
        blue,
      },
      clues: [
        ...oldState.clues,
        {
          team: game.team,
          description: game.clue!.description,
          amount: game.clue!.amount,
        },
      ],
    }));

    if (isGameOver || red === 0 || blue === 0) {
      if (isGameOver) {
        game.handleWinner(nextTeam);
      } else {
        game.handleWinner(red === 0 ? Team.RED : Team.BLUE);
        handleOpenAllCards();
      }
      game.handleStatus(Status.FINISH_GAME);
      disconnectClient();
    } else {
      game.handleClue(null);
    }
    game.handleTeam(nextTeam);
  };

  const handleOpen = () => {
    let opened = 0;
    let delayToOpen = 0;
    let openedOtherTeam = 0;
    let isGameOver = false;
    let newCards = { ...cards };
    const cardsToOpen = Object.entries(cards)
      .filter(([_, card]) => card.votes > 0)
      .sort(([_, a], [__, b]) => b.votes - a.votes)
      .slice(0, game.clue!.amount);

    for (const [title, { type }] of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = Object.entries(newCards).reduce<ObjectCardProps>(
          (previous, [key, card]) => ({
            ...previous,
            [key]: {
              ...card,
              isOpen: true,
              revealed: card.title === title || card.revealed,
              votes: 0,
              delayToOpen: card.type === CardType.GAME_OVER ? 0 : 0.5,
            },
          }),
          {}
        );
        isGameOver = true;
        break;
      } else {
        delayToOpen += 0.1;

        newCards = {
          ...newCards,
          [title]: {
            ...newCards[title],
            isOpen: true,
            revealed: true,
            votes: 0,
            delayToOpen,
          },
        };

        if (
          (game.team === Team.RED && type === CardType.RED) ||
          (game.team === Team.BLUE && type === CardType.BLUE)
        ) {
          opened += 1;
        } else {
          if (
            (game.team === Team.RED && type === CardType.BLUE) ||
            (game.team === Team.BLUE && type === CardType.RED)
          ) {
            openedOtherTeam += 1;
          }

          break;
        }
      }
    }

    votes.current = {};
    setTotalVotes(0);
    setCards(newCards);
    handleOnFinishTurn(opened, openedOtherTeam, isGameOver);
  };

  const handleVote = (
    username: string,
    message: string,
    userTeam: Team | null
  ) => {
    if (userTeam === game.team && game.isTimerRunning) {
      const lowerCase = message.toLowerCase();

      if (words.includes(lowerCase)) {
        const userVote = Object.entries(votes.current).filter(
          ([user]) => user === username
        );

        if (userVote.length === 0) {
          setTotalVotes((oldState) => oldState + 1);
          setCards((oldState) => ({
            ...oldState,
            [lowerCase]: {
              ...oldState[lowerCase],
              votes: oldState[lowerCase].votes + 1,
            },
          }));
        } else {
          const [_, title] = userVote[0];
          setCards((oldState) => ({
            ...oldState,
            [title]: {
              ...oldState[title],
              votes: oldState[title].votes - 1,
            },
            [lowerCase]: {
              ...oldState[lowerCase],
              votes: oldState[lowerCase].votes + 1,
            },
          }));
        }

        votes.current = {
          ...votes.current,
          [username]: lowerCase,
        };
      }
    }
  };

  const callback: OnMessageCallback = (_, userState, message) => {
    if (userState.username) {
      handleVote(userState.username, message, Team.RED);
    }
  };

  //

  const renderTitle = () => {
    let message = 'Aguardando a dica da(o) streamer';
    if (game.winner) {
      message = `O time ${
        game.winner === Team.RED ? 'vermelho' : 'azul'
      } venceu`;
    }
    return (
      <S.Title
        className={animateTitle ? 'animateTitle' : ''}
        onAnimationEnd={() => setAnimateTitle(false)}
      >
        {message}
      </S.Title>
    );
  };

  //

  const getAmount = useCallback(() => {
    if (game.clue !== null) {
      setAnimateTitle(true);
      if (game.isTimerRunning) {
        setAmount(game.clue.amount);
      } else {
        handleOpen();
      }
    }
  }, [game.clue, game.isTimerRunning]);

  const initClientListener = useCallback(() => {
    if (game.client && game.isTimerRunning) {
      game.client.addListener('message', callback);
    }
  }, [game.client, game.isTimerRunning]);

  const initCards = useCallback(() => {
    if (words.length > 0) {
      const getType = (value: number) => {
        if (value < game.amount.red) {
          return CardType.RED;
        }
        if (value < game.amount.red + game.amount.blue) {
          return CardType.BLUE;
        }
        if (value < 24) {
          return CardType.NO_TEAM;
        }
        return CardType.GAME_OVER;
      };

      const shuffledWords = shuffleArray(words);

      const cardsFromWords: ObjectCardProps = shuffledWords.reduce(
        (previous, word, index) => ({
          ...previous,
          [word]: {
            id: index,
            title: word,
            isOpen: false,
            revealed: false,
            type: getType(index),
            votes: 0,
            delayToOpen: 0,
          },
        }),
        {}
      );

      setCards(cardsFromWords);
      setCrossCards(cardsFromWords);
    }
  }, [words]);

  useEffect(() => {
    getAmount();
  }, [getAmount]);

  useEffect(() => {
    initClientListener();

    return () => {
      if (game.client) {
        game.client.removeListener('message', callback);
      }
    };
  }, [initClientListener]);

  useEffect(() => {
    initCards();
  }, [initCards]);

  return (
    <S.Container>
      <S.Header>
        {game.clue !== null && game.status === Status.GAME ? (
          <>
            <S.Clue>{game.clue.description}</S.Clue>
            <S.Amount>{amount}</S.Amount>
          </>
        ) : (
          renderTitle()
        )}
      </S.Header>
      <S.Content>
        {Object.entries(cards).map(([titleKey, { title, ...cardRest }]) => (
          <Card
            key={titleKey}
            title={titleKey}
            {...cardRest}
            team={game.team}
            totalVotes={totalVotes}
            isStreamerTurn={game.isStreamerTurn}
            onOpen={() => {
              //
            }}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Board;
