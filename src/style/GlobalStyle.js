import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
      box-sizing : border-box;
    }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;