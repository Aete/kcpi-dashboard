import styled from 'styled-components';
import {
  BlueGray900,
  BlueGray100,
  Secondary,
  NavBackground,
  White,
  Blue50,
  DarkNavy,
} from '../../utils/colors';
import { pc, tablet } from '../../utils/media';

export const NavWidthTab = `${75}px`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${BlueGray100};

  position: fixed;
  bottom: 0;

  color: ${BlueGray900};

  @media screen and (${tablet}) {
    width: ${NavWidthTab};
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default function Navigation() {
  return <NavContainer>test</NavContainer>;
}
