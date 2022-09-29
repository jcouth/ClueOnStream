import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px 72px;

  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url('https://cdn.codenames.game/v20210210/img/bg-raster.svg');
  background-size: cover;
  background-repeat: no-repeat;
  mix-blend-mode: overlay;
`;

export const Content = styled.div<{ team: 'red' | 'blue' }>`
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-column-gap: 20px;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};

  overflow: hidden;
  transition: background-color 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: inherit;
    border: 4px solid ${({ theme }) => theme.colors.white};
  }
`;

export const Aside = styled.aside`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-row-gap: 20px;
`;

export const Main = styled.main`
  margin-right: 20px; // same of content column gap
`;
