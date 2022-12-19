import styled from 'styled-components';
import { White } from '../../utils/colors';
import { tablet } from '../../utils/media';
import Overall from './charts/main/Overall';
import DataTable from './charts/main/DataTable';

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 20px 0 0;

  @media screen and (${tablet}) {
    width: calc(50% - 40px);
    margin-left: 20px;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ChartSet() {
  return (
    <ChartContainer>
      <Overall />
    </ChartContainer>
  );
}
