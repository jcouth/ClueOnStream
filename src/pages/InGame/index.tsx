import React, { useState } from 'react';

import Card, { CardStatus } from '../../components/Card';

import mock from './cards';

import * as S from './styles';

const InGame = () => {
  const [cards, setCards] = useState(mock || []);

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
