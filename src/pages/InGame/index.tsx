import React, { useEffect, useState } from 'react';

import Card, { CardStatus } from '../../components/Card';

import { Cards } from '../../interfaces/Cards';

import { fetchVerbs } from '../../services/api';

import * as S from './styles';

const InGame = () => {
  const [cards, setCards] = useState<Cards[]>([]);

  const randomizeAndFilter = (array: Cards[], maxItems: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, maxItems);
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();
      const newCards = randomizeAndFilter(data, 25);

      setCards(newCards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVerbs();
  }, []);

  return (
    <S.Container>
      <S.Aside>
        <S.Chat></S.Chat>
        <S.Cam></S.Cam>
      </S.Aside>
      <S.Content>
        <S.Board>
          {cards.map((card, i) => (
            <Card
              key={card.id}
              title={card.title}
              status={card.status}
              onOpen={() => {
                setCards((oldState) => {
                  const newCards = [...oldState];
                  newCards[i] = { ...newCards[i], status: CardStatus.OPEN };
                  return newCards;
                });
              }}
            />
          ))}
        </S.Board>
        <div
          style={
            {
              // backgroundColor: 'red',
            }
          }
        ></div>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
