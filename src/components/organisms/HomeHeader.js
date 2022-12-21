import { useRef } from 'react';
import styled from 'styled-components';
import { Background, Black, BlueGray900 } from '../../utils/colors';
import {
  kcpiDescription,
  kcpiIntroduction,
  kcpiIntroTwo,
} from '../../utils/text/home';
import { TextHeader } from '../atoms/text';
import { HeaderChapterTitle, KCPITitle } from '../atoms/titles';

const HeaderContainer = styled.header`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px;
  background-color: ${Background};
  border-bottom: 1px solid ${Black};
  color: ${Black};
  transition: height 0.7s ease-out;
  overflow-y: hidden;

  &.detail {
    height: 100vh;
    justify-content: flex-start;
  }

  & span {
    cursor: pointer;
    font-weight: 600;
  }

  & .shrink {
    display: none;
  }

  & .more {
    display: inline;
  }

  &.detail .shrink {
    display: inline;
  }

  &.detail .more {
    display: none;
  }
`;

export default function HomeHeader() {
  const width = window.screen.width;
  const headerRef = useRef();

  const handleClick = () => {
    headerRef.current.classList.toggle('detail');
  };
  return (
    <HeaderContainer ref={headerRef}>
      <KCPITitle>
        대한민국 도시번영지수
        {width < 450 ? <br /> : ' '}
        (K-CPI)
      </KCPITitle>
      <TextHeader>
        {kcpiDescription}{' '}
        <span className={'more'} onClick={handleClick}>
          (더보기)
        </span>
        <span className={'shrink'} onClick={handleClick}>
          (감추기)
        </span>
      </TextHeader>
      <HeaderChapterTitle>개요</HeaderChapterTitle>

      <TextHeader>{kcpiIntroduction}</TextHeader>

      <TextHeader>{kcpiIntroTwo}</TextHeader>
    </HeaderContainer>
  );
}
