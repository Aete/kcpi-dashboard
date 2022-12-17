import styled from 'styled-components';
import { Background, Black } from '../../utils/colors';
import { pc, tablet } from '../../utils/media';

export const NavWidthTab = `${75}px`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${Background};

  position: fixed;
  bottom: 0;

  color: ${Black};

  @media screen and (${tablet}) {
    width: ${NavWidthTab};
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${Black};
  }
`;

export default function Navigation() {
  return <NavContainer>test</NavContainer>;
}
