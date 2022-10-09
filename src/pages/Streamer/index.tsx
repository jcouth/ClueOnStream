import React, { useEffect, useState } from 'react';

import { ObjectCardProps } from 'interfaces/Card';

import * as S from './styles';
import Card from './Card';

const Streamer: React.FC = () => {
  const [cards, setCards] = useState<ObjectCardProps>({});

  useEffect(() => {
    const storageCards = localStorage.getItem('@ClueOnStream::cards');
    if (storageCards) {
      setCards(JSON.parse(storageCards));
    }
  }, []);

  useEffect(() => {
    const onReceieveMessage = (e: StorageEvent) => {
      const { key, newValue } = e;
      if (key === '@ClueOnStream::cards') {
        setCards(newValue ? JSON.parse(newValue) : {});
      }
    };

    window.addEventListener('storage', onReceieveMessage);

    return () => window.removeEventListener('storage', onReceieveMessage);
  }, [setCards]);

  return (
    <S.Container>
      <S.Content>
        {cards ? (
          <>
            <S.Title>Dê as dicas baseado nestas cartas</S.Title>
            <S.Board>
              {Object.entries(cards).map(([titleKey, { title, type }]) => (
                <Card key={titleKey} title={title} type={type} />
              ))}
            </S.Board>
          </>
        ) : (
          <S.TextWrapper>
            <S.Title>Aguardando início da partida</S.Title>
            <S.Subtitle>
              Posicione esta tela de forma que não apareça na live
            </S.Subtitle>
          </S.TextWrapper>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Streamer;
