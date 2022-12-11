import styled from 'styled-components';
import { BlueGray900 } from '../../utils/colors';
import { tablet } from '../../utils/media';

export const TextHeader = styled.p`
  font-size: 12px;
  line-height: 20px;
  word-break: keep-all;
  font-family: 'Noto Sans KR', sans-serif;
  color: ${BlueGray900};

  @media screen and (${tablet}) {
    font-size: 16px;
    line-height: 24px;
    word-break: keep-all;
  }
`;
