import Chart from '../organisms/Chart';
import HomeHeader from '../organisms/HomeHeader';
import Navigation from '../organisms/Navigation';
import { MainTemplate } from '../templates/MainTemplate';
import { PageTemplate } from '../templates/PageTemplate';

export default function Home() {
  return (
    <PageTemplate>
      <Navigation />
      <MainTemplate>
        <HomeHeader />
        <Chart />
      </MainTemplate>
    </PageTemplate>
  );
}
