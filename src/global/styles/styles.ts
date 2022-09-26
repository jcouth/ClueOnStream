import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    
    margin: 0;
    padding: 0;

    font-family: "Montserrat", sans-serif;
    
    text-decoration: none;
    user-select:none;
  };
  button {
    cursor: pointer;
  };
`;
