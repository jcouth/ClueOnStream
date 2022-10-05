import styled from 'styled-components';

import CardOverlay from 'assets/card-overlay.svg';
import { CardColors } from 'components/Content/Board/Card/styles';
import { CardProps } from 'interfaces/Card';

interface Props {
  cardType: CardProps['type'];
}

export const Container = styled.button<Props>`
  position: relative;

  padding: 1.055vw;

  border: none;
  border-radius: 0.792vw;
  background-color: ${({ cardType }) => CardColors.principal[cardType]};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0.528vw;
    left: 0.528vw;

    width: calc(100% - 1.055vw);
    height: calc(100% - 1.055vw);

    border: 0.132vw solid ${({ cardType }) => CardColors.before[cardType]};
    border-radius: 0.792vw;

    opacity: 0.5;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Content = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.396vw;
  padding: 0.528vw 0.792vw;

  border-radius: 0.264vw;
  background-color: ${({ cardType }) => CardColors.before[cardType]};
`;

export const ContentText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.white};

  letter-spacing: -0.033vw;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;
