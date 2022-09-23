import styled from 'styled-components';

export const Container = styled.div`
  /* margin: 0 auto; */
  position: relative;
`;

export const SelectedOption = styled.button`
  margin-left: 12px;
  padding: 6px 12px;

  border-radius: 6px;
`;

export const ListContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + 12px);
`;

export const ListContent = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListItem = styled.li`
  list-style: none;
`;

export const ListButton = styled.button`
  margin-left: 6px;
  padding: 6px 12px;

  border-radius: 6px;
`;
