import React, { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router';

import { shuffleAndSlice } from '../../helpers/shuffleAndSlice';

import { fetchVerbs } from '../../services/api';

import * as S from './styles';

const MAX_CARDS = 25;

const Home = () => {
  const allWords = useRef<string[]>([]);
  const navigate = useNavigate();

  const handleNewGame = () => {
    const words = shuffleAndSlice(allWords.current, MAX_CARDS);

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
