import styled, { css } from 'styled-components';

export const Container = styled.button<{ status: string; isOpen: boolean }>`
  display: flex;

  padding: 8px;

  border-radius: 12px;
  background: ${({ status }) => status};

  overflow: hidden;
  box-shadow: 0 0 4px black;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      cursor: pointer;
    `}
`;

export const Content = styled.div<{ status: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 6px 4px;

  width: 100%;
  height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  background-color: ${({ status }) => status};

  overflow: hidden;
`;

export const Title = styled.p`
  display: inline-block;

  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);

  text-align: center;
  text-transform: uppercase;
`;
