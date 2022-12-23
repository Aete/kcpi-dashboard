import { useState } from 'react';
import Modal from '../organisms/Modal';
import Chart from '../organisms/Chart';
import HomeHeader from '../organisms/HomeHeader';
import Navigation from '../organisms/Navigation';
import { MainTemplate } from '../templates/MainTemplate';
import { PageTemplate } from '../templates/PageTemplate';

const sido = [
  '서울',
  '부산',
  '대전',
  '대구',
  '광주',
  '울산',
  '세종',
  '제주',
  '경기',
  '경북',
  '경남',
  '충북',
  '충남',
  '전북',
  '전남',
  '강원',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function Home() {
  const [display, setDisplay] = useState('none');
  const [sCity, setSCity] = useState(sido[getRandomInt(17)]);

  const handleModule = (e) => {
    e.stopPropagation();
    setDisplay(display === 'flex' ? 'none' : 'flex');
  };

  return (
    <PageTemplate>
      <Navigation />
      <MainTemplate>
        <HomeHeader />
        <Chart handleModule={handleModule} sCity={sCity} setSCity={setSCity} />
      </MainTemplate>
      <Modal display={display} handleModule={handleModule} sCity={sCity} />
    </PageTemplate>
  );
}
