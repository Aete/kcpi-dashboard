import styled from 'styled-components';
import { White } from '../../../../utils/colors';

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${White};
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
`;

export default function Overall() {
  return <ChartContainer />;
}
