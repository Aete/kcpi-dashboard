import styled from 'styled-components';
import { BlueGray900, White } from '../../utils/colors';

const ChartContainer = styled.div`
  width: calc((100% - 20px) / 2);
  height: calc((100% - 20px) / 2);
  background-color: ${White};
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const SubsetContainer = styled.div`
  height: calc((100% - 220px));
  display: flex;
  flex-wrap: wrap;
  background-color: ${BlueGray900};
`;

function Productivity() {
  return <ChartContainer>test </ChartContainer>;
}

export default function ChartSubSet() {
  return <SubsetContainer></SubsetContainer>;
}
