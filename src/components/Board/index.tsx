import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  team: Team;
  clue: ClueProps | null;
  words: string[];
  onFinishTurn(isGameOver: boolean): void;
}

const SECONDS = 5;
const INTERVAL = 100;

// (100% * interval-in-ms) / (seconds-in-ms)
const PROGRESS_DECAY = (100 * INTERVAL) / (SECONDS * 1000);

const Board: React.FC<Props> = ({ team, clue, words, onFinishTurn }) => {
  const progressRef = useRef<NodeJS.Timer>();

  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [progress, setProgress] = useState<number>(100);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [cardsWithVotes, setCardsWithVotes] = useState<VoteProps[]>([]);

  const handleVote = (id: CardProps['id'], type: CardProps['type']) => {
    if (clue) {
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
          (team === Team.RED && type !== CardType.RED) ||
          (team === Team.BLUE && type !== CardType.BLUE)
        ) {
          break;
        }
      }
    }

    setCardsWithVotes([]);
    setTotalVotes(0);
    onFinishTurn(isGameOver);
    setCards(newCards);
    setProgress(100);
  };

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);
      openCards();
    }
  }, [progress]);

  const getCards = useCallback(() => {
    const getType = (value: number) => {
      if (value < 9) {
        return CardType.RED;
      }
      if (value < 17) {
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
      setAmount(clue.amount);
      progressRef.current = setInterval(
        () => setProgress((oldState) => oldState - PROGRESS_DECAY),
        INTERVAL
      );
    }
  }, [clue]);

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
      <S.Timer isStreamerTurn={clue === null}>
        <S.Progress progress={progress} interval={`${INTERVAL / 1000}s`} />
      </S.Timer>
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
