import { useState } from 'react';
import CityChart from '../molecules/CityChart';
import Chart from '../organisms/Chart';
import HomeHeader from '../organisms/HomeHeader';
import Navigation from '../organisms/Navigation';
import { MainTemplate } from '../templates/MainTemplate';
import { PageTemplate } from '../templates/PageTemplate';

export default function Home() {
  const [display, setDisplay] = useState('y');

  const handleModule = () => {
    setDisplay(display === 'y' ? 'n' : 'y');
  };

  return (
    <PageTemplate>
      <Navigation />
      <MainTemplate>
        <HomeHeader />
        <Chart handleModule={handleModule} />
      </MainTemplate>
      <CityChart display={display} handleModule={handleModule} />
    </PageTemplate>
  );
}
