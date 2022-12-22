import styled from 'styled-components';
import { Background, Black } from '../../utils/colors';
import { pc, tablet } from '../../utils/media';
import { NavImg } from '../atoms/NavImg';
import NavIcon from '../molecules/NavIcon';
import HomeIconSVG from '../../utils/imgs/home.svg';
export const NavWidthTab = `${75}px`;

const NavContainer = styled.div`
  display: flex;
  width: ${NavWidthTab};
  height: 100vh;
  background-color: ${Background};

  position: absolute;
  z-index: 1;
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
  return (
    <NavContainer>
      <NavIcon isActive={'y'} text={'Home'} />
      <NavIcon isActive={'n'} text={'프로젝트 소개'} />

      <NavIcon isActive={'n'} text={'도시별 분석'} />
      <NavIcon isActive={'n'} text={'지표별 분석'} />
    </NavContainer>
  );
}
