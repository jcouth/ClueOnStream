import React, { memo } from 'react';

import { ReactComponent as ProfileCard } from 'assets/profile-card.svg';
import { CardColors } from 'components/Content/Board/Card/styles';
import { CardProps } from 'interfaces/Card';

import * as S from './styles';

type Props = Pick<CardProps, 'title'> & Pick<CardProps, 'type'>;

const Card: React.FC<Props> = ({ title, type }) => (
  <S.Container cardType={type}>
    <S.Header>
      <ProfileCard fill={CardColors.before[type]} />
    </S.Header>
    <S.Content cardType={type}>
      <S.ContentText>{title}</S.ContentText>
    </S.Content>
  </S.Container>
);

export default memo(Card);
