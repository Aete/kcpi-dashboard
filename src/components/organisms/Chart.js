import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlueGray900 } from '../../utils/colors';
import { tablet } from '../../utils/media';
import ChartSet from '../molecules/Chartset';
import Map from '../molecules/Map';

const DashboardContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  color: ${BlueGray900};
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media screen and (${tablet}) {
    flex-direction: row;
    padding: 0 0 0 20px;
  }
`;

export default function Dashboard() {
  const [height, setHeight] = useState(window.innerHeight - 180);
  const [sCity, setSCity] = useState(null);
  const [hCity, setHCity] = useState(null);

  useEffect(() => {}, [hCity]);

  return (
    <DashboardContainer height={height}>
      <Map setHCity={setHCity} setSCity={setSCity} />
      <ChartSet setHCity={setHCity} setSCity={setSCity} />
    </DashboardContainer>
  );
}
