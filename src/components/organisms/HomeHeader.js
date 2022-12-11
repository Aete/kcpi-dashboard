import styled from 'styled-components';
import { Navy, BlueMyFavorite, White, BlueGray900 } from '../../utils/colors';
import { kcpiDescription } from '../../utils/text/home';
import { TextHeader } from '../atoms/text';
import { KCPITitle } from '../atoms/titles';

const HeaderContainer = styled.header`
  width: 100%;
  border-radius: 10px;
`;

export default function HomeHeader() {
  const width = window.screen.width;
  return (
    <HeaderContainer>
      <KCPITitle>
        대한민국 도시번영지수
        {width < 450 ? <br /> : ' '}
        (K-CPI)
      </KCPITitle>
      <TextHeader>{kcpiDescription}</TextHeader>
    </HeaderContainer>
  );
}
