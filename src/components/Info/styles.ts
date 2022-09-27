import styled from 'styled-components';

type Teams = 'red' | 'blue';

export const Container = styled.div`
  display: flex;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card.normal.primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-row-gap: 12px;

  padding: 18px 14px 14px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card.normal.secondary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Team = styled.div<{ team: Teams }>`
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

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white_90};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const HistoryTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.black};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const HistoryClues = styled.div`
  flex-grow: 1;
  position: relative;

  margin-top: 4px;

  width: 100%;

  overflow: hidden;
`;

export const HistoryCluesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: absolute;
  top: 0;
  left: 0;

  padding: 0 8px 6px;

  width: 100%;
  height: 100%;
`;

export const Clue = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 8px;

  margin-top: 6px;
`;

export const ClueTitle = styled.p<{ team: Teams }>`
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

export const ClueAmount = styled.p<{ team: Teams }>`
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

export const Timer = styled.div<{ team: Teams }>`
  display: flex;
  align-items: center;

  position: relative;

  height: 36px;
`;

export const TimerIcon = styled.div<{ team: Teams }>`
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
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Progress = styled.div<{ team: Teams }>`
  position: relative;

  margin-left: 20px;

  width: calc(100% - 20px);
  height: 24px;

  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 90%;
    height: 100%;

    border-radius: 12px;
    background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  }
`;
