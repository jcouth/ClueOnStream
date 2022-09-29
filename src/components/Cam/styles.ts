import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  padding-bottom: 12px;
`;

export const Title = styled.p`
  margin-top: 6px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-row-gap: 8px;
  align-items: flex-end;

  position: relative;

  padding: 18px 14px;

  min-height: 135px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const ContentInfo = styled(Title)`
  display: flex;
  align-items: center;

  margin-top: unset;

  height: 100%;

  text-align: center;
`;
