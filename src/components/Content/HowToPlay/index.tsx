import React from 'react';

import PredictionIcon from 'assets/prediction.svg';
import OfferIcon from 'assets/offer.svg';
import BuldIcon from 'assets/bulb.svg';
import ChatIcon from 'assets/chat.svg';

import * as S from './styles';

const HowToPlay = () => {
  const renderCard = (icon: React.ReactNode, title: string, index: number) => (
    <S.Card delay={index}>
      <S.CardPins>
        <span />
        <span />
        <span />
        <span />
      </S.CardPins>
      {icon}
      <S.CardText>{title}</S.CardText>
    </S.Card>
  );

  return (
    <S.Container>
      <S.Title>Como jogar</S.Title>
      <S.Content>
        {renderCard(
          <PredictionIcon width="100%" height="4.222vw" fill="white" />,
          'Entre em uma equipe pelo palpite da live',
          2
        )}
        {renderCard(
          <BuldIcon width="100%" height="4.222vw" fill="white" />,
          'Aguarde pela dica e turno da sua equipe',
          4
        )}
        {renderCard(
          <ChatIcon width="100%" height="4.222vw" fill="white" />,
          'Digite o que está escrito no card e envie',
          6
        )}
        {renderCard(
          <OfferIcon width="100%" height="4.222vw" fill="white" />,
          'Serão abertos os cards com maiores % de votos',
          8
        )}
      </S.Content>
    </S.Container>
  );
};
export default HowToPlay;
