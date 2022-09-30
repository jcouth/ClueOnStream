import styled from 'styled-components';

import { Team as TeamProps } from 'interfaces/Card';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  padding: 0.792vw 1.055vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.792vw 0.792vw 0.396vw;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-row-gap: 0.792vw;
`;

export const Title = styled.p`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.title};

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Status = styled(Title)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 0.528vw;
  align-items: center;

  margin: 0.528vw 0;

  font-size: ${({ theme }) => theme.fonts.primary.size};

  &::before,
  &::after {
    content: '';

    width: 100%;
    height: 0.132vw;

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

  width: 2.375vw;
  height: 2.375vw;

  border: 0.198vw solid ${({ theme }) => theme.colors.white};
  border-radius: 6.596vw;
  background-color: ${({ theme, team, isStreamerTurn }) =>
    isStreamerTurn ? theme.colors.primary : theme.colors.team[team].primary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Timer = styled.div<{ expand: boolean }>`
  display: grid;
  grid-row-gap: 0.528vw;
  align-items: flex-end;

  position: relative;

  padding: 0.792vw;
  padding-left: 1.319vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  box-shadow: inset 0vw 0.264vw 0.264vw
    ${({ theme, expand }) => (expand ? 'transparent' : theme.colors.shadow)};

  transition: box-shadow 0.25s ease-out ${({ expand }) => (expand ? 0 : 0.5)}s;
`;

export const Selector = styled.div<{ expand: boolean; height: number }>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ expand, height }) => (expand ? -height : 0.66)}vw;

  padding: ${({ expand }) => (expand ? 0.396 : 0)}vw 0.923vw;

  width: 100%;
  height: ${({ expand, height }) => (expand ? height + 0.66 : 0)}vw;

  border-radius: 0.792vw;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw
    ${({ theme, expand }) => (expand ? theme.colors.shadow : 'transparent')};

  overflow: hidden;
  transition: height 0.5s ease-in-out, top 0.5s ease-in-out,
    padding 0.5s ease-in-out, box-shadow 0.25s ease-in-out 0.125s;
`;

export const SelectorTitle = styled.p`
  margin-top: 0.396vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const SelectorContent = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  grid-template-rows: 2.111vw;
  grid-column-gap: 0.528vw;

  margin-top: 0.264vw;
`;

export const TimerContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1.319vw;
  align-items: center;
`;
