import styled from 'styled-components';
import { Blue900, BlueGray900, BlueMyFavorite, Navy } from '../../utils/colors';
import { tablet } from '../../utils/media';

export const KCPITitle = styled.h1`
  font-weight: 800;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 18px;
  line-height: 32px;
  word-break: keep-all;
  color: ${Navy};

  @media screen and (${tablet}) {
    font-size: 24px;
    line-height: 55px;
    word-break: keep-all;
  }
`;
