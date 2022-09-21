import React, { useEffect, useRef, useState } from 'react';

import Card from '../../components/Card';

import { Cards, CardStatus } from '../../interfaces/Cards';

import { fetchVerbs } from '../../services/api';

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
  secondsPerRound?: number;
}

const DEFAULT_CLUE_DESCRIPTION = 'Aguarde até a próxima dica';

const InGame: React.FC<Props> = ({ secondsPerRound = 5 }) => {
  const progressDecay = useRef<number>(1);
  const progressRef = useRef<NodeJS.Timer>();
  const inputClueRef = useRef<HTMLInputElement>(null);

  const [cards, setCards] = useState<Cards[]>([]);
  const [clue, setClue] = useState<ClueProps>({
    description: DEFAULT_CLUE_DESCRIPTION,
    team: Team.RED,
  });
  const [progress, setProgress] = useState<number>(100);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);

  const handleClue = () => {
    if (isStreamerTurn && inputClueRef.current?.value) {
      const currentClue = inputClueRef.current.value;
      inputClueRef.current.value = '';

      setIsStreamerTurn(false);
      setClue((oldState) => ({
        description: currentClue,
        amount: 0,
        team: oldState.team === Team.RED ? Team.BLUE : Team.RED,
      }));

      progressRef.current = setInterval(
        () => setProgress((oldState) => oldState - progressDecay.current),
        100
      );
    }
  };

  const handleOpenCard = (index: number, team: boolean) => {
    setCards((oldState) => {
      const newCards = [...oldState];
      newCards[index] = {
        ...newCards[index],
        status: team ? CardStatus.RED_TEAM : CardStatus.BLUE_TEAM,
      };
      return newCards;
    });
  };

  const shuffleAndSlice = (array: string[], maxItems: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, maxItems);
  };

  const convertToCards = (array: string[]) => {
    return [...array].map((item, index) => ({
      id: index,
      title: item,
      status: CardStatus.UNOPEN,
    }));
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();

      const shuffledData = shuffleAndSlice(data, 25);
      const newCards = convertToCards(shuffledData);

      setCards(newCards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVerbs();
  }, []);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);
      setProgress(100);
      setIsStreamerTurn(true);
      setClue((oldState) => ({
        description: DEFAULT_CLUE_DESCRIPTION,
        team: oldState.team,
      }));
    }
  }, [progress]);

  useEffect(() => {
    // 100% / seconds per round / (1000/100 (from setInterval ms))
    progressDecay.current = 100 / secondsPerRound / 10;
  }, [secondsPerRound]);

  return (
    <S.Container>
      <S.Aside>
        <S.Chat></S.Chat>
        <S.Cam>
          <S.CamContent>
            <S.ClueInput ref={inputClueRef} placeholder='Digite aqui' />
            <S.ClueAmountSelect>0</S.ClueAmountSelect>
            <S.ClueButton onClick={handleClue}>Enviar</S.ClueButton>
          </S.CamContent>
          <S.Team>Dica para o time: {clue.team}</S.Team>
        </S.Cam>
      </S.Aside>
      <S.Content>
        <S.Board>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              title={card.title}
              status={card.status}
              onOpen={() => handleOpenCard(index, index % 2 === 0)}
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
