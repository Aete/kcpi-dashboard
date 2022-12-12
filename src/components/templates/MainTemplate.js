import styled from 'styled-components';
import { tablet } from '../../utils/media';
import { NavWidth } from '../organisms/Navigation';

export const MainTemplate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (${tablet}) {
    margin-left: ${NavWidth};
  }
`;
