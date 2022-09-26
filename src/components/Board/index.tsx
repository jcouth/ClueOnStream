import React, { useCallback, useEffect, useRef, useState } from 'react';

import { shuffleArray } from '../../helpers/shuffleArray';

import { CardProps, CardType, Team } from '../../interfaces/Card';
import { ClueProps } from '../../interfaces/Clue';

import * as S from './styles';

import Card from './Card';

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

  const handleOpen = (id: CardProps['id'], type: CardProps['type']) => {
    if (clue) {
      if (type === CardType.GAME_OVER) {
        setCards((oldState) =>
          oldState.map((oldCard) => ({ ...oldCard, isOpen: true }))
        );
        onFinishTurn(true);
        setProgress(0);
      } else {
        if (
          (type === CardType.RED && team === Team.RED) ||
          (type === CardType.BLUE && team === Team.BLUE)
        ) {
          setAmount((oldState) => oldState - 1);

          if (amount === 1) {
            setProgress(0);
            onFinishTurn(false);
          }
        } else {
          setProgress(0);
          onFinishTurn(false);
        }

        setCards((oldState) =>
          oldState.map((oldCard) => {
            if (oldCard.id === id) {
              return { ...oldCard, isOpen: true };
            }
            return oldCard;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);
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
            isStreamerTurn={clue === null}
            onOpen={handleOpen}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Board;
