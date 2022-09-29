import styled from 'styled-components';

import { Team as TeamProps } from '../../../interfaces/Card';

export const Container = styled.div`
  display: flex;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-row-gap: 12px;

  padding: 18px 14px 14px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Team = styled.div<{ team: TeamProps }>`
  display: flex;
  justify-content: space-between;

  padding: 0 12px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const TeamTitle = styled.p`
  margin-top: 12px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const TeamAmount = styled(TeamTitle)`
  margin-top: unset;

  font-size: 56px;
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px 12px 6px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const HistoryTitle = styled.p`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 8px;
  align-items: center;

  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  &::before,
  &::after {
    content: '';

    width: 100%;
    height: 2px;

    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const HistoryClues = styled.div`
  flex-grow: 1;
  position: relative;

  margin-top: 4px;

  width: 100%;

  overflow: hidden;
`;

export const HistoryLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const HistoryCluesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: absolute;
  top: 0;
  left: 0;

  padding-bottom: 6px;

  width: 100%;
  height: 100%;
`;

export const Clue = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 8px;

  margin-top: 6px;
`;

export const ClueTitle = styled.p<{ team: TeamProps }>`
  flex-grow: 1;
  display: flex;
  align-items: center;

  padding: 4px 12px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  border-left: 12px solid
    ${({ theme, team }) => theme.colors.team[team].primary};
  border-radius: 6px;
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const ClueAmount = styled.p<{ team: TeamProps }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 10px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  border-radius: 6px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  height: 36px;
`;

export const TimerIcon = styled.div<{
  team: TeamProps;
  isStreamerTurn: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;

  width: 36px;
  height: 36px;

  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 100px;
  background-color: ${({ theme, team, isStreamerTurn }) =>
    isStreamerTurn ? theme.colors.primary : theme.colors.team[team].primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Progress = styled.div<{
  isStreamerTurn: boolean;
  team: TeamProps;
  progress: number;
  interval: string;
}>`
  position: relative;

  margin-left: 20px;

  width: calc(100% - 20px);
  height: 24px;

  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme, team, isStreamerTurn }) =>
    isStreamerTurn
      ? theme.colors.secondary
      : theme.colors.team[team].secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  transition: background-color ${({ interval }) => interval} ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${({ progress }) => progress}%;
    height: 100%;

    border-radius: inherit;
    background-color: ${({ theme, team, isStreamerTurn }) =>
      isStreamerTurn ? theme.colors.primary : theme.colors.team[team].primary};

    transition: width ${({ interval }) => interval} ease-in-out;
  }
`;
