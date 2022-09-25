import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router';

import Card from '../../components/Card';
import Cam from '../../components/Cam';

import { shuffleArray } from '../../helpers/shuffleArray';

import { Cards, CardStatus } from '../../interfaces/Cards';

import * as S from './styles';

enum Team {
  RED = 'red',
  BLUE = 'blue',
}

interface ClueProps {
  description: string;
  amount?: number;
  team: Team;
}
interface Props {
  words: string[];
  seconds: number;
}

const DEFAULT_CLUE_DESCRIPTION = 'Aguarde até a próxima dica';
const INTERVAL_MS = 100;

const InGame: React.FC<Props> = () => {
  const { state } = useLocation();
  const { words, seconds } = state as Props; // Read values passed on state

  const progressDecay = useRef<number>(1);
  const progressRef = useRef<NodeJS.Timer>();

  const [cards, setCards] = useState<Cards[]>([]);
  const [clue, setClue] = useState<ClueProps>({
    description: DEFAULT_CLUE_DESCRIPTION,
    team: Team.RED,
  });
  const [progress, setProgress] = useState<number>(100);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);

  const handleSendClue = (description: string, amount: number) => {
    if (isStreamerTurn) {
      setIsStreamerTurn(false);
      setClue((oldState) => ({
        description,
        amount,
        team: oldState.team,
      }));

      progressRef.current = setInterval(
        () => setProgress((oldState) => oldState - progressDecay.current),
        INTERVAL_MS
      );
    }
  };

  const handleOpenCard = (index: number) => {
    if (!isStreamerTurn && clue.amount && 0 < clue.amount) {
      const card = cards[index];

      if (!card.isOpen) {
        let newAmount = 0;

        if (card.status === CardStatus.GAME_OVER) {
          const newCards = [...cards].map((card) => ({
            ...card,
            isOpen: true,
          }));
          setCards(newCards);
          setProgress(0);
        } else {
          if (
            (card.status === CardStatus.RED_TEAM && clue.team === Team.RED) ||
            (card.status === CardStatus.BLUE_TEAM && clue.team === Team.BLUE)
          ) {
            newAmount = clue.amount - 1;

            if (newAmount === 0) {
              setProgress(0);
            }
          } else {
            setProgress(0);
          }

          setCards((oldState) => {
            const newCards = [...oldState];
            newCards[index] = {
              ...newCards[index],
              isOpen: true,
            };
            return newCards;
          });
        }

        setClue((oldState) => {
          const newClue = {
            ...oldState,
            amount: newAmount,
          };
          return newClue;
        });
      }
    }
  };

  const getCards = useCallback(() => {
    const getStatus = (value: number) => {
      if (value < 9) {
        return CardStatus.RED_TEAM;
      }
      if (value < 17) {
        return CardStatus.BLUE_TEAM;
      }
      if (value < 24) {
        return CardStatus.WRONG;
      }
      return CardStatus.GAME_OVER;
    };

    const newCards = words.map((item, index) => ({
      id: index,
      title: item,
      status: getStatus(index),
      isOpen: false,
    }));

    const shuffled = shuffleArray(newCards);

    setCards(shuffled);
  }, [words]);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);

      setProgress(100);
      setIsStreamerTurn(true);
      setClue((oldState) => ({
        description: DEFAULT_CLUE_DESCRIPTION,
        team: oldState.team === Team.RED ? Team.BLUE : Team.RED,
      }));
    }
  }, [progress]);

  useEffect(() => {
    // 1 second in ms / interval ms
    const intervalPerSecond = 1000 / INTERVAL_MS;

    // 100% / seconds per round / interval per second
    const decay = 100 / seconds / intervalPerSecond;

    progressDecay.current = decay;
  }, [seconds]);

  useEffect(() => {
    getCards();
  }, [getCards]);

  return (
    <S.Container>
      <S.Aside>
        <S.Chat></S.Chat>
        <Cam team={clue.team} onSend={handleSendClue} />
      </S.Aside>
      <S.Content>
        <S.Board>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              title={card.title}
              status={card.status}
              isOpen={card.isOpen}
              onOpen={() => handleOpenCard(index)}
            />
          ))}
        </S.Board>
        <S.Info>
          <S.Clue>
            <S.ClueDescription>{clue.description}</S.ClueDescription>
            {clue.amount !== undefined && (
              <S.ClueAmount>{clue.amount}</S.ClueAmount>
            )}
          </S.Clue>
          <S.Timer hideTimer={isStreamerTurn}>
            <S.Progress progress={progress} />
          </S.Timer>
        </S.Info>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
