import styled from 'styled-components';
import {
  Blue50,
  BlueGray100,
  BlueGray50,
  BlueMyFavorite,
  NavBackground,
  White,
} from '../../utils/colors';
import { mobile, tablet } from '../../utils/media';

export const NavWidth = `${90}px`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  background-color: #001945;
  color: ${White};
  @media screen and (${tablet}) {
    width: ${NavWidth};
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default function Navigation() {
  return <NavContainer>test</NavContainer>;
}
