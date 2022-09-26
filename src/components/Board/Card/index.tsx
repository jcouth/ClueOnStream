import React, { memo, useState } from 'react';

import { ReactComponent as ProfileCard } from '../../../assets/profile-card.svg';

import { CardProps } from '../../../interfaces/Card';

import * as S from './styles';

interface Props extends CardProps {
  isStreamerTurn: boolean;
  onOpen(id: CardProps['id'], type: CardProps['type']): void;
}

const Card: React.FC<Props> = ({
  id,
  title,
  isOpen,
  type,
  isStreamerTurn,
  onOpen,
}) => {
  const [shake, setShake] = useState<boolean>(false);

  const handleOpen = () => {
    if (isOpen || isStreamerTurn) {
      if (!shake) {
        setShake(true);
      }
    } else {
      onOpen(id, type);
    }
  };

  return (
    <S.Container
      isOpen={isOpen}
      cardType={type}
      onClick={handleOpen}
      className={shake ? 'shake' : ''}
      onAnimationEnd={() => setShake(false)}
    >
      <S.Header>
        <S.Percentage visible={false}>
          <S.PercentageText>47%</S.PercentageText>
        </S.Percentage>
        <ProfileCard fill={isOpen ? S.CardColors.before[type] : '#BA5A31'} />
      </S.Header>
      <S.Content isOpen={isOpen} cardType={type}>
        <S.ContentText isOpen={isOpen}>{title}</S.ContentText>
      </S.Content>
    </S.Container>
  );
};

export default memo(Card);
