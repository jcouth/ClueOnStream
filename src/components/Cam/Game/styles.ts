import styled from 'styled-components';

import { Content as ParentContent } from '../styles';

import * as A from './attrs';

export const Content = styled(ParentContent).attrs<A.ContentProps>(
  A.content
)<A.ContentProps>``;

export const Selector = styled.div.attrs<A.SelectorProps>(
  A.selector
)<A.SelectorProps>`
  display: flex;
  flex-direction: column;

  position: absolute;

  width: 100%;

  border-radius: 0.792vw;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.primary};

  overflow: hidden;
  transition: height 0.5s ease-in-out, top 0.5s ease-in-out,
    padding 0.5s ease-in-out, box-shadow 0.25s ease-in-out 0.125s;
`;

export const Title = styled.p`
  margin-top: 0.396vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const SelectorContent = styled.div.attrs<A.SelectorContentProps>(
  A.selectorContent
)<A.SelectorContentProps>`
  display: grid;
  grid-template-rows: 2.111vw;
  grid-column-gap: 0.528vw;

  margin-top: 0.264vw;
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.902vw;
  grid-column-gap: 0.528vw;
`;

export const Input = styled.input.attrs(A.input)`
  padding: 0.792vw;

  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  outline: 0;
  border: none;
  border-radius: 0.396vw;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  text-transform: uppercase;
`;

export const Buttons = styled(Controls)`
  grid-template-columns: 1fr 2fr;
`;
