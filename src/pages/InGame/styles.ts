import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  column-gap: 26px;

  padding: 46px 72px 20px;
`;

export const Aside = styled.div`
  display: grid;
  grid-template-rows: 1fr 218px;
  row-gap: 20px;
`;

export const Chat = styled.div`
  border: 5px solid black;
  border-radius: 12px;
`;

export const Cam = styled.div`
  border: 5px solid black;
  border-radius: 12px;
`;

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
