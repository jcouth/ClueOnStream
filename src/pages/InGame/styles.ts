import styled, { css } from 'styled-components';

export const Container = styled.div<{ team: 'red' | 'blue' }>`
  display: grid;
  grid-template-columns: 350px 1fr;
  column-gap: 26px;

  padding: 20px 72px;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  background-image: url(https://cdn.codenames.game/v20210210/img/bg-raster.svg);
  /* background-image: url(https://svgsilh.com/png-512/1975573.png); */
  mix-blend-mode: overlay;
  background-size: cover;
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
`;

export const Chat = styled.div`
  flex: 1;
  margin-bottom: 20px;

  border: 5px solid black;
  border-radius: 12px;
`;

export const Main = styled.main``;

export const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  row-gap: 22px;

  padding: 16px;
`;

export const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: repeat(5, 160px);
  gap: 10px;

  justify-content: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Clue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClueDescription = styled.p`
  padding: 8px 32px;

  min-width: 340px;

  border-radius: 6px;
  background-color: white;
  text-align: center;
`;

export const ClueAmount = styled.p`
  margin-left: 12px;
  padding: 8px 16px;

  border-radius: 6px;
  background-color: white;
`;

export const Timer = styled.div<{ hideTimer: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 12px;

  width: 372px;
  height: 20px;

  border-radius: 6px;
  background-color: lightblue;

  ${({ hideTimer }) =>
    hideTimer &&
    css`
      visibility: hidden;
    `}
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;

  border-radius: inherit;
  background-color: lightcoral;

  transition: 'width 1s ease-in-out';
`;
