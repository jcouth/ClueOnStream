import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 3.958vw 1fr;
  grid-row-gap: 0.792vw;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: 1.979vw;

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  &.animateTitle {
    animation: animateTitle 1s ease-in-out;
  }

  @keyframes animateTitle {
    0%,
    75%,
    100% {
      transform: scale(1);
    }
    25%,
    50% {
      transform: scale(1.05);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  grid-gap: 0.528vw;

  margin-top: 0.792vw;
`;

export const Clue = styled.div`
  padding: 0.792vw 1.187vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  border-radius: 0.396vw;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  text-transform: uppercase;
`;

export const Amount = styled(Clue)`
  margin-left: 0.528vw;
`;
