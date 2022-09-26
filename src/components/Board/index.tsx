import React, { useCallback, useEffect, useState } from 'react';

import { shuffleArray } from '../../helpers/shuffleArray';

import { Card as CardProps, CardType, Team } from '../../interfaces/Card';
import { Clue } from '../../interfaces/Clue';

import * as S from './styles';

import Card from './Card';

interface Props {
  team: Team;
  clue: Clue | null;
  words: string[];
  onFinishTurn(isGameOver: boolean): void;
}

const Board: React.FC<Props> = ({ team, clue, words, onFinishTurn }) => {
  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);

  const handleOpen = (id: CardProps['id'], type: CardProps['type']) => {
    if (clue) {
      if (type === CardType.GAME_OVER) {
        setCards((oldState) =>
          oldState.map((oldCard) => ({ ...oldCard, isOpen: true }))
        );
        onFinishTurn(true);
        // setProgress(0);
      } else {
        if (
          (type === CardType.RED && team === Team.RED) ||
          (type === CardType.BLUE && team === Team.BLUE)
        ) {
          setAmount((oldState) => oldState - 1);

          if (amount === 1) {
            //   setProgress(0);
            onFinishTurn(false);
          }
        } else {
          // setProgress(0);
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
    }
  }, [clue]);

  useEffect(() => {
    getAmount();
  }, [getAmount]);

  return (
    <S.Container>
      {clue ? (
        <S.Title>
          Dica: {clue.description}[{amount}]
        </S.Title>
      ) : (
        <S.Title>Aguardando a dica da(o) streamer</S.Title>
      )}
      <S.Content>
        {cards.map((card) => (
          <Card {...card} isStreamerTurn={clue === null} onOpen={handleOpen} />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Board;
