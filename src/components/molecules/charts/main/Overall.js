import styled from 'styled-components';
import { Black, White } from '../../../../utils/colors';

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid ${Black};
  position: relative;
  margin-top: 10px;
`;

export default function Overall({ setSCity }) {
  return <ChartContainer onClick={(e) => setSCity('서울')} />;
}
