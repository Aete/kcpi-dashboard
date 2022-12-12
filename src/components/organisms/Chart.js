import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlueGray900, White } from '../../utils/colors';
import Map from '../molecules/Map';

const DashboardContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  color: ${BlueGray900};
  margin-top: 30px;
  display: flex;
  padding: 0 20px;
`;

export default function Dashboard() {
  const [height, setHeight] = useState(window.innerHeight - 200);

  useEffect(() => {});

  return (
    <DashboardContainer height={height}>
      <Map />
    </DashboardContainer>
  );
}
