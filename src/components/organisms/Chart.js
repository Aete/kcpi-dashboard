import styled from 'styled-components';
import { BlueGray900, White } from '../../utils/colors';
import Map from '../molecules/Map';

const DashboardContainer = styled.div`
  width: 100%;
  height: ${window.innerHeight - 160}px;
  color: ${BlueGray900};
  margin-top: 30px;
  display: flex;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Map />
    </DashboardContainer>
  );
}
