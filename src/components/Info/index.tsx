import React from 'react';

import { ReactComponent as AlarmIcon } from '../../assets/alarm.svg';

import * as S from './styles';

interface Props {}

const Info: React.FC<Props> = ({}) => {
  return (
    <S.Container>
      <S.Content>
        <S.Team team='red'>
          <S.TeamTitle>Vermelho</S.TeamTitle>
          <S.TeamAmount>9</S.TeamAmount>
        </S.Team>
        <S.Team team='blue'>
          <S.TeamTitle>Azul</S.TeamTitle>
          <S.TeamAmount>8</S.TeamAmount>
        </S.Team>
        <S.History>
          <S.HistoryTitle>Histórico de Dicas</S.HistoryTitle>
          <S.HistoryClues>
            <S.HistoryCluesContent>
              <S.Clue>
                <S.ClueTitle team='red'>Cinema</S.ClueTitle>
                <S.ClueAmount team='red'>3</S.ClueAmount>
              </S.Clue>
              <S.Clue>
                <S.ClueTitle team='blue'>Entretenimento</S.ClueTitle>
                <S.ClueAmount team='blue'>7</S.ClueAmount>
              </S.Clue>
              <S.Clue>
                <S.ClueTitle team='red'>Cinema</S.ClueTitle>
                <S.ClueAmount team='red'>3</S.ClueAmount>
              </S.Clue>
              <S.Clue>
                <S.ClueTitle team='blue'>Entretenimento</S.ClueTitle>
                <S.ClueAmount team='blue'>7</S.ClueAmount>
              </S.Clue>
            </S.HistoryCluesContent>
          </S.HistoryClues>
        </S.History>
        <S.Timer team='red'>
          <S.TimerIcon team='red'>
            <AlarmIcon />
          </S.TimerIcon>
          <S.Progress team='red' />
        </S.Timer>
      </S.Content>
    </S.Container>
  );
};

export default Info;
