import styled from 'styled-components';
import { pc, tablet } from '../../utils/media';

export const PageTemplate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  @media screen and (${tablet}) {
    flex-direction: row;
  }
`;
