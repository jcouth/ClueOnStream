import React, { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router';

import { shuffleArray } from '@helpers/shuffleArray';
import { fetchVerbs } from '@services/api';

import * as S from './styles';

const MAX_CARDS = 25;

const Home = () => {
  // quantidade de pessoas no time
  // quantas cartas faltam para cada time
  // histórico de dicas
  // conectar à twitch
  const allWords = useRef<string[]>([]);
  const navigate = useNavigate();

  const handleNewGame = () => {
    const shuffled = shuffleArray(allWords.current);
    const words = shuffled.slice(0, MAX_CARDS);

    navigate('game', {
      state: {
        words,
        seconds: 60,
      },
    });
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();

      allWords.current = data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allWords.current.length === 0) {
      getVerbs();
    }
  }, []);

  return (
    <S.Container>
      <S.NewGameButton onClick={handleNewGame}>Jogar</S.NewGameButton>
    </S.Container>
  );
};

export default Home;
