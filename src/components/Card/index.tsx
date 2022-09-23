import React, { useCallback, useEffect, useState } from 'react';

import { CardStatus } from '../../interfaces/Cards';

import * as S from './styles';

interface Props {
  title: string;
  status: CardStatus;
  isOpen: boolean;
  onOpen(): void;
}

const colors: { [key in keyof typeof CardStatus]: string } = {
  RED_TEAM: '#D34F73',
  BLUE_TEAM: '#634fd3',
  WRONG: '#3F292B',
  GAME_OVER: 'rgba(0, 0, 0, 0.5)',
};

const Card: React.FC<Props> = ({ title, status, onOpen, isOpen }) => {
  const [color, setColor] = useState('#DBBEA1');

  const handleOpen = useCallback(() => {
    // animate style
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (isOpen) {
      setColor(colors[status]);
    }
  }, [status, isOpen]);

  return (
    <S.Container
      status={color}
      isOpen={isOpen}
      disabled={isOpen}
      onClick={handleOpen}
    >
      <S.Content status={color}>
        <S.Title>{title}</S.Title>
      </S.Content>
    </S.Container>
  );
};

export default Card;
