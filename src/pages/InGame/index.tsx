import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router';

import Select from '../../components/Select';
import Card from '../../components/Card';

import { shuffleAndSlice } from '../../helpers/shuffleAndSlice';

import { Cards, CardStatus } from '../../interfaces/Cards';

import * as S from './styles';

enum Team {
  RED = 'Vermelho',
  BLUE = 'Azul',
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
const OPTIONS = [1, 2, 3, 4, 5, 6];

const InGame: React.FC<Props> = () => {
  const { state } = useLocation();
  const { words, seconds } = state as Props; // Read values passed on state

  const progressDecay = useRef<number>(1);
  const progressRef = useRef<NodeJS.Timer>();
  const inputClueRef = useRef<HTMLInputElement>(null);

  const [cards, setCards] = useState<Cards[]>([]);
  const [clue, setClue] = useState<ClueProps>({
    description: DEFAULT_CLUE_DESCRIPTION,
    team: Team.RED,
  });
  const [amount, setAmount] = useState<number>(0);
  const [progress, setProgress] = useState<number>(100);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);

  const handleSendClue = () => {
    if (isStreamerTurn && inputClueRef.current?.value) {
      const currentClue = inputClueRef.current.value;

      setIsStreamerTurn(false);
      setClue((oldState) => ({
        description: currentClue,
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

    const shuffled = shuffleAndSlice(newCards);

    setCards(shuffled);
  }, [words]);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);

      if (inputClueRef.current) {
        inputClueRef.current.value = '';
      }

      setProgress(100);
      setIsStreamerTurn(true);
      setAmount(0);
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
        <S.Cam>
          <S.CamContent>
            <S.ClueInput
              ref={inputClueRef}
              aria-autocomplete='none'
              placeholder='Digite aqui'
              disabled={!isStreamerTurn}
            />
            <Select
              selected={amount}
              onSelect={setAmount}
              options={OPTIONS}
              disabled={!isStreamerTurn}
            />
          </S.CamContent>
          <S.Team>Dica para o time: {clue.team}</S.Team>
          <S.ClueButton disabled={!isStreamerTurn} onClick={handleSendClue}>
            Enviar
          </S.ClueButton>
        </S.Cam>
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
