import styled from 'styled-components';

import { Team as TeamProps } from 'interfaces/Card';

export const Container = styled.div`
  display: flex;

  padding: 0.792vw 1.055vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-row-gap: 0.792vw;

  padding: 1.187vw 0.923vw 0.923vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Team = styled.div<{ team: TeamProps }>`
  display: flex;
  justify-content: space-between;

  padding: 0 0.792vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const TeamTitle = styled.p`
  margin-top: 0.792vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const TeamAmount = styled(TeamTitle)`
  margin-top: unset;

  font-size: 3.694vw;
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.792vw 0.792vw 0.396vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const HistoryTitle = styled.p`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 0.528vw;
  align-items: center;

  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  &::before,
  &::after {
    content: '';

    width: 100%;
    height: 0.132vw;

    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const HistoryClues = styled.div`
  flex-grow: 1;
  position: relative;

  margin-top: 0.264vw;

  width: 100%;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  overflow: hidden;

  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    box-shadow: inset 0vw 1.319vw 0.792vw -0.792vw ${({ theme }) => theme.colors.shadow};
  }
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

  padding-bottom: 0.396vw;

  width: 100%;
  height: 100%;
`;

export const Clue = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 0.528vw;

  margin-top: 0.396vw;
`;

export const ClueTitle = styled.p<{ team: TeamProps }>`
  flex-grow: 1;
  display: flex;
  align-items: center;

  padding: 0.264vw 0.792vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  border-left: 0.792vw solid
    ${({ theme, team }) => theme.colors.team[team].primary};
  border-radius: 0.396vw;
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const ClueAmount = styled.p<{ team: TeamProps }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.264vw 0.66vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  border-radius: 0.396vw;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  height: 2.375vw;
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

  width: 2.375vw;
  height: 2.375vw;

  border: 0.198vw solid ${({ theme }) => theme.colors.white};
  border-radius: 6.596vw;
  background-color: ${({ theme, team, isStreamerTurn }) =>
    isStreamerTurn ? theme.colors.primary : theme.colors.team[team].primary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Progress = styled.div<{
  isStreamerTurn: boolean;
  team: TeamProps;
  progress: number;
  interval: string;
}>`
  position: relative;

  margin-left: 1.319vw;

  width: calc(100% - 1.319vw);
  height: 1.583vw;

  border: 0.198vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme, team, isStreamerTurn }) =>
    isStreamerTurn
      ? theme.colors.secondary
      : theme.colors.team[team].secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

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
