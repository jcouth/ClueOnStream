import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.319vw 4.749vw;

  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};

  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: inherit;
    border: 0.264vw solid ${({ theme }) => theme.colors.white};
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  grid-gap: 0.528vw;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  margin-bottom: 1.319vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: 36px;

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Subtitle = styled(Title)`
  font-size: 24px;
`;
