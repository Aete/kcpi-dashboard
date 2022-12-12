import styled from 'styled-components';
import { tablet } from '../../utils/media';

export const KCPITitle = styled.h1`
  font-weight: 800;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 30px;
  line-height: 50px;
  word-break: keep-all;

  @media screen and (${tablet}) {
    font-size: 36px;
    line-height: 70px;
    word-break: keep-all;
  }
`;
