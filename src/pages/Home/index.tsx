import React, { useEffect, useRef } from 'react';

import { shuffleAndSlice } from '../../helpers/shuffleAndSlice';

import { fetchVerbs } from '../../services/api';

import * as S from './styles';

const MAX_CARDS = 25;

const Home = () => {
  const words = useRef<string[]>([]);

  const handleNewGame = () => {
    const cards = shuffleAndSlice(words.current, MAX_CARDS);

    // navigate('', cards);
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();

      words.current = data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (words.current.length === 0) {
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
