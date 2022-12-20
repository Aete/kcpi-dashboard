import styled from 'styled-components';
import { pc, tablet } from '../../utils/media';
import Overall from './charts/main/Overall';
import OverallTable from './charts/main/OverallTable';

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 20px 0 0;

  @media screen and (${tablet}) {
    width: 100%;
    margin-left: 20px;
  }

  @media screen and (${pc}) {
    width: calc(100% - 450px);
    max-width: 900px;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ChartSet({ sCity, hCity, setSCity, setHCity }) {
  return (
    <ChartContainer>
      <Overall
        sCity={sCity}
        hCity={hCity}
        setSCity={setSCity}
        setHCity={setHCity}
      />
      <OverallTable
        sCity={sCity}
        hCity={hCity}
        setSCity={setSCity}
        setHCity={setHCity}
      />
    </ChartContainer>
  );
}
