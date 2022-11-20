import React, { useCallback, useEffect, useRef, useState } from 'react';

import { shuffleArray } from 'helpers/shuffleArray';
import { OnMessageCallback, useGame } from 'hooks/useGame';
import { CardProps, CardType, Team } from 'interfaces/Card';
import { Status } from 'interfaces/Status';

import * as S from './styles';
import Card from './Card';

interface VoteProps {
  [key: CardProps['title']]: string[];
}

interface CardWithVotesProps {
  title: CardProps['title'];
  votes: CardProps['votes'];
}

interface Props {
  words: string[];
}

const Board: React.FC<Props> = ({ words }) => {
  const game = useGame();

  const votes = useRef<VoteProps>({});
  const amountRef = useRef<number>(0);
  const cardsWithVotes = useRef<CardWithVotesProps[]>([]);

  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animateTitle, setAnimateTitle] = useState<boolean>(false);

  //

  const handleOpenAllCards = () => {
    setCards((oldState) =>
      oldState.map((oldCard) => ({
        ...oldCard,
        isOpen: true,
        votes: 0,
      }))
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
    let newCards = [...cards];
    const titleOfCardsWithVotes = cardsWithVotes.current.map(
      (item) => item.title
    );
    const cardsToOpen = cards
      .filter((card) => card.votes > 0)
      .sort((a, b) => {
        if (a.votes > b.votes) return -1;
        if (a.votes < b.votes) return 1;

        if (
          titleOfCardsWithVotes.indexOf(a.title) >
          titleOfCardsWithVotes.indexOf(b.title)
        )
          return 1;
        if (
          titleOfCardsWithVotes.indexOf(a.title) <
          titleOfCardsWithVotes.indexOf(b.title)
        )
          return -1;

        return 0;
      })
      .slice(0, game.clue!.amount);

    for (const { title, type } of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = newCards.map((oldCard) => ({
          ...oldCard,
          isOpen: true,
          revealed: oldCard.title === title || oldCard.revealed,
          votes: 0,
          delayToOpen: oldCard.type === CardType.GAME_OVER ? 0 : 0.5,
        }));
        isGameOver = true;
        break;
      } else {
        delayToOpen += 0.1;

        newCards = newCards.map((oldCard) => {
          if (oldCard.title === title) {
            return {
              ...oldCard,
              isOpen: true,
              revealed: true,
              votes: 0,
              delayToOpen,
            };
          }
          return { ...oldCard, votes: 0 };
        });

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
    cardsWithVotes.current = [];
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
        const computeVote = (newVotes: string[], toAdd = true) => {
          const value = toAdd ? 1 : -1;

          cardsWithVotes.current = cardsWithVotes.current
            .map((item) => {
              if (item.title === lowerCase) {
                return { ...item, votes: item.votes + value };
              }
              return item;
            })
            .filter((item) => item.votes > 0);

          votes.current = {
            ...votes.current,
            [username]: newVotes,
          };

          setTotalVotes((oldState) => oldState + value);
          setCards((oldState) =>
            oldState.map((oldCard) => {
              if (oldCard.title === lowerCase) {
                return {
                  ...oldCard,
                  votes: oldCard.votes + value,
                };
              }
              return oldCard;
            })
          );
        };

        const userVote = Object.entries(votes.current).filter(
          ([user]) => user === username
        );

        if (userVote.length === 0) {
          computeVote([lowerCase]);
        } else {
          const [_, currentVotes] = userVote[0];

          if (currentVotes.includes(lowerCase)) {
            computeVote(
              currentVotes.filter((item) => item !== lowerCase),
              false
            );
          } else {
            if (currentVotes.length < amountRef.current) {
              computeVote([...currentVotes, lowerCase]);
            } else {
              const [firstVote] = currentVotes;

              cardsWithVotes.current = cardsWithVotes.current
                .map((oldCard) => {
                  if (oldCard.title === lowerCase) {
                    return { ...oldCard, votes: oldCard.votes + 1 };
                  }
                  if (oldCard.title === firstVote) {
                    return { ...oldCard, votes: oldCard.votes - 1 };
                  }
                  return oldCard;
                })
                .filter((oldCard) => oldCard.votes > 0);

              votes.current = {
                ...votes.current,
                [username]: [...currentVotes, lowerCase].slice(1),
              };

              setCards((oldState) =>
                oldState.map((oldCard) => {
                  if (oldCard.title === lowerCase) {
                    return { ...oldCard, votes: oldCard.votes + 1 };
                  }
                  if (oldCard.title === firstVote) {
                    return { ...oldCard, votes: oldCard.votes - 1 };
                  }
                  return oldCard;
                })
              );
            }
          }
        }
      }
    }
  };

  const callback: OnMessageCallback = (_, userState, message) => {
    if (userState.username) {
      const raw = (userState['badge-info-raw'] ?? '').replace(
        'predictions/',
        ''
      );
      if (raw.length > 0) {
        if (raw.includes('vermelha')) {
          handleVote(userState.username, message, Team.RED);
        } else if (raw.includes('azul')) {
          handleVote(userState.username, message, Team.BLUE);
        }
      }
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
        amountRef.current = game.clue.amount;
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

      const cardsFromWords: CardProps[] = words.map((word, index) => ({
        id: index,
        title: word,
        isOpen: false,
        revealed: false,
        type: getType(index),
        votes: 0,
        delayToOpen: 0,
      }));

      const shuffled = shuffleArray(cardsFromWords);

      setCards(shuffled);

      localStorage.setItem('@ClueOnStream::cards', JSON.stringify(shuffled));
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

  //

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
        {cards.map(({ title, ...cardRest }) => (
          <Card
            key={title}
            title={title}
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
