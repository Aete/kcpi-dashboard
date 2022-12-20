import styled from 'styled-components';
import { Background, Black } from '../../utils/colors';
import { pc, tablet } from '../../utils/media';

export const NavWidthTab = `${75}px`;

const NavContainer = styled.div`
  display: flex;
  width: ${NavWidthTab};
  height: 100vh;
  background-color: ${Background};

  position: absolute;
  left: -${NavWidthTab};
  top: 0;

  color: ${Black};
  flex-direction: column;
  border-right: 1px solid ${Black};

  @media screen and (${pc}) {
    left: 0;
  }
`;

export default function Navigation() {
  return <NavContainer>test</NavContainer>;
}
