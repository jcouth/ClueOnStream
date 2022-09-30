import styled from 'styled-components';

import { Team as TeamProps } from 'interfaces/Card';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px 12px 6px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-row-gap: 12px;
`;

export const Title = styled.p`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.title};

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Status = styled(Title)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 8px;
  align-items: center;

  margin: 8px 0;

  font-size: ${({ theme }) => theme.fonts.primary.size};

  &::before,
  &::after {
    content: '';

    width: 100%;
    height: 2px;

    background-color: ${({ theme }) => theme.colors.white};
  }
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

export const Timer = styled.div<{ expand: boolean }>`
  display: grid;
  grid-row-gap: 8px;
  align-items: flex-end;

  position: relative;

  padding: 12px;
  padding-left: 20px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? 'transparent' : theme.colors.shadow)};

  transition: box-shadow 0.25s ease-out ${({ expand }) => (expand ? 0 : 0.5)}s;
`;

export const Selector = styled.div<{ expand: boolean; height: number }>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ expand, height }) => (expand ? -height : 12)}px;

  padding: ${({ expand }) => (expand ? 6 : 0)}px 14px;

  width: 100%;
  height: ${({ expand, height }) => (expand ? height + 12 : 0)}px;

  border-radius: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? theme.colors.shadow : 'transparent')};

  overflow: hidden;
  transition: height 0.5s ease-in-out, top 0.5s ease-in-out,
    padding 0.5s ease-in-out, box-shadow 0.25s ease-in-out 0.125s;
`;

export const SelectorTitle = styled.p`
  margin-top: 6px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const SelectorContent = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  grid-template-rows: 32px;
  grid-column-gap: 8px;

  margin-top: 4px;
`;

export const TimerContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  align-items: center;
`;
