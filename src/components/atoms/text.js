import styled from 'styled-components';
import { tablet } from '../../utils/media';

export const TextHeader = styled.p`
  font-size: 15px;
  line-height: 24px;
  word-break: keep-all;
  font-family: 'Noto Sans KR', sans-serif;
  margin-top: 10px;

  @media screen and (${tablet}) {
    font-size: 15px;
    line-height: 24px;
    word-break: keep-all;
  }
`;
