import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlueGray900 } from '../../utils/colors';
import { pc, tablet } from '../../utils/media';
import ChartSet from '../molecules/Chartset';
import Map from '../molecules/Map';

const DashboardContainer = styled.div`
  width: 100%;
  color: ${BlueGray900};
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  @media screen and (${pc}) {
    flex-direction: row;
    padding: 0 0 0 20px;
    height: ${(props) => props.height}px;
  }
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function Dashboard({ handleModule, sCity, setSCity }) {
  const [height, setHeight] = useState(window.innerHeight - 140);

  const [hCity, setHCity] = useState(null);

  return (
    <DashboardContainer height={height}>
      <Map
        sCity={sCity}
        hCity={hCity}
        setHCity={setHCity}
        setSCity={setSCity}
        handleModule={handleModule}
      />
      <ChartSet
        sCity={sCity}
        hCity={hCity}
        setHCity={setHCity}
        setSCity={setSCity}
      />
    </DashboardContainer>
  );
}
