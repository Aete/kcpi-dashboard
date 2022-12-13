import styled from 'styled-components';
import { tablet } from '../../utils/media';

export const KCPITitle = styled.h1`
  font-weight: 800;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 18px;
  line-height: 30px;
  word-break: keep-all;

  @media screen and (${tablet}) {
    font-size: 22px;
    line-height: 34px;
    word-break: keep-all;
  }
`;
