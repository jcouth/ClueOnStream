import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Status } from 'components/Info/Lobby/styles';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { CardProps, CardType, Team } from 'interfaces/Card';

import Card from './Card';

import * as S from './styles';

interface VoteProps {
  id: CardProps['id'];
  type: CardProps['type'];
  votes: CardProps['votes'];
}

interface Props {
  words: string[];
}

const Board: React.FC<Props> = ({ words }) => {
  const {
    winner,
    amount: { red: amountOfRedCards, blue: amountOfBlueCards },
    team,
    clue,
    history,
    isTimerRunning,
    handleIsStreamerTurn,
    handleWinner,
    handleStatus,
    handleTeam,
    handleHistory,
    handleClue,
    reset,
  } = useGame();

  const finishedByGameOver = useRef<boolean>(false);

  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animateTitle, setAnimateTitle] = useState<boolean>(false);
  const [cardsWithVotes, setCardsWithVotes] = useState<VoteProps[]>([]);

  const handleOnFinishTurn = (
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ) => {
    handleIsStreamerTurn(true);
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
      handleWinner(nextTeam);
      handleStatus(Status.FINISH_GAME);
      handleTeam(nextTeam);
      reset();
    } else if (red === 0) {
      handleWinner(Team.RED);
      handleStatus(Status.FINISH_GAME);
      reset();
    } else if (blue === 0) {
      handleWinner(Team.BLUE);
      handleStatus(Status.FINISH_GAME);
      reset();
    } else {
      handleTeam(nextTeam);
    }

    handleHistory((oldState) => ({
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
    handleClue(null);
  };

  const handleVote = (id: CardProps['id'], type: CardProps['type']) => {
    if (isTimerRunning) {
      setTotalVotes((oldState) => oldState + 1);
      setCards((oldState) =>
        oldState.map((oldCard) => {
          if (oldCard.id === id) {
            return { ...oldCard, votes: oldCard.votes + 1 };
          }
          return oldCard;
        })
      );
      const filter = cardsWithVotes.filter((item) => item.id === id);
      if (filter.length === 0) {
        setCardsWithVotes((oldState) => [...oldState, { id, type, votes: 1 }]);
      } else {
        setCardsWithVotes((oldState) =>
          oldState.map((oldCard) => {
            if (oldCard.id === id) {
              return { ...oldCard, votes: oldCard.votes + 1 };
            }
            return oldCard;
          })
        );
      }
    }
  };

  const openAllCards = () => {
    setCards((oldState) =>
      oldState.map((oldCard) => ({
        ...oldCard,
        isOpen: true,
        votes: 0,
      }))
    );
  };

  const openCards = () => {
    let opened = 0;
    let openedOtherTeam = 0;
    let isGameOver = false;
    let newCards = [...cards];
    const cardsToOpen = cardsWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, clue!.amount);

    let delayToOpen = 0;
    for (const { id, type } of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = newCards.map((oldCard) => ({
          ...oldCard,
          isOpen: true,
          votes: 0,
          delayToOpen: oldCard.type === CardType.GAME_OVER ? 0 : 0.5,
        }));
        isGameOver = true;
        break;
      } else {
        newCards = newCards.map((oldCard) => {
          if (oldCard.id === id) {
            delayToOpen += 0.1;
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
          (team === Team.RED && type === CardType.RED) ||
          (team === Team.BLUE && type === CardType.BLUE)
        ) {
          opened += 1;
        } else {
          if (
            (team === Team.RED && type === CardType.BLUE) ||
            (team === Team.BLUE && type === CardType.RED)
          ) {
            openedOtherTeam += 1;
          }

          break;
        }
      }
    }

    finishedByGameOver.current = isGameOver;
    setCardsWithVotes([]);
    setTotalVotes(0);
    setCards(newCards);
    handleOnFinishTurn(opened, openedOtherTeam, isGameOver);
  };

  const renderTitle = () => {
    let message = 'Aguardando a dica da(o) streamer';
    if (winner) {
      message = `O time ${winner === Team.RED ? 'vermelho' : 'azul'} venceu`;
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

  const getAmount = useCallback(() => {
    if (clue != null) {
      setAnimateTitle(true);
      if (isTimerRunning) {
        setAmount(clue.amount);
      } else {
        openCards();
      }
    }
  }, [clue, isTimerRunning]);

  useEffect(() => {
    getAmount();
  }, [getAmount]);

  const hasWinner = useCallback(() => {
    if (winner && !finishedByGameOver.current) {
      openAllCards();
    }
  }, [winner, finishedByGameOver.current]);

  useEffect(() => {
    hasWinner();
  }, [hasWinner]);

  const getCards = useCallback(() => {
    const getType = (value: number) => {
      if (value < amountOfRedCards) {
        return CardType.RED;
      }
      if (value < amountOfRedCards + amountOfBlueCards) {
        return CardType.BLUE;
      }
      if (value < 24) {
        return CardType.NO_TEAM;
      }
      return CardType.GAME_OVER;
    };

    const cardsFromWords: CardProps[] = words.map((item, index) => ({
      id: index,
      title: item,
      isOpen: false,
      revealed: false,
      type: getType(index),
      votes: 0,
      delayToOpen: 0,
    }));

    const shuffled = shuffleArray(cardsFromWords);

    setCards(shuffled);
  }, [words]);

  useEffect(() => {
    getCards();
  }, [getCards]);
  return (
    <S.Container>
      <S.Header>
        {clue != null ? (
          <>
            <S.Clue>{clue.description}</S.Clue>
            <S.Amount>{amount}</S.Amount>
          </>
        ) : (
          renderTitle()
        )}
      </S.Header>
      <S.Content>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            team={team}
            totalVotes={totalVotes}
            isStreamerTurn={clue === null}
            onOpen={handleVote}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Board;
