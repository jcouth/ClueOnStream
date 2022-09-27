import React, { useCallback, useEffect, useState } from 'react';

import { shuffleArray } from '../../helpers/shuffleArray';

import { CardProps, CardType, Team } from '../../interfaces/Card';
import { ClueProps } from '../../interfaces/Clue';

import * as S from './styles';

import Card from './Card';

interface VoteProps {
  id: CardProps['id'];
  type: CardProps['type'];
  votes: CardProps['votes'];
}

interface Props {
  amountOfRedCards: number;
  amountOfBlueCards: number;
  team: Team;
  clue: ClueProps | null;
  words: string[];
  isTimerRunning: boolean;
  onFinishTurn(
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ): void;
}

const Board: React.FC<Props> = ({
  amountOfRedCards,
  amountOfBlueCards,
  team,
  clue,
  words,
  isTimerRunning,
  onFinishTurn,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [cardsWithVotes, setCardsWithVotes] = useState<VoteProps[]>([]);

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

  const openCards = () => {
    let opened = 0;
    let openedOtherTeam = 0;
    let isGameOver = false;
    let newCards = [...cards];
    const cardsToOpen = cardsWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, clue!.amount);

    for (const { id, type } of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = newCards.map((oldCard) => ({
          ...oldCard,
          isOpen: true,
          votes: 0,
        }));
        isGameOver = true;
        break;
      } else {
        newCards = newCards.map((oldCard) => {
          if (oldCard.id === id) {
            return {
              ...oldCard,
              isOpen: true,
              votes: 0,
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

    setCardsWithVotes([]);
    setTotalVotes(0);
    onFinishTurn(opened, openedOtherTeam, isGameOver);
    setCards(newCards);
  };

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

    const cardsFromWords = words.map((item, index) => ({
      id: index,
      title: item,
      isOpen: false,
      type: getType(index),
      votes: 0,
    }));

    const shuffled = shuffleArray(cardsFromWords);

    setCards(shuffled);
  }, [words]);

  useEffect(() => {
    getCards();
  }, [getCards]);

  const getAmount = useCallback(() => {
    if (clue) {
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

  return (
    <S.Container>
      <S.Header>
        {clue ? (
          <>
            <S.Clue>{clue.description}</S.Clue>
            <S.Amount>{amount}</S.Amount>
          </>
        ) : (
          <S.Title>Aguardando a dica da(o) streamer</S.Title>
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
