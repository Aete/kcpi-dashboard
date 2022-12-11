import styled from 'styled-components';
import { BlueGray900, White } from '../../utils/colors';
import Map from '../molecules/Map';

const ChartContainer = styled.div`
  width: 100%;
  height: ${window.innerHeight - 160}px;
  color: ${BlueGray900};
  margin-top: 30px;
  display: flex;
`;

export default function Chart() {
  return (
    <ChartContainer>
      <Map />
    </ChartContainer>
  );
}
