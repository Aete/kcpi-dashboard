import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import OverallChart from './OverallChart';

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-top: 10px;
`;

export default function Overall({ sCity, hCity, setSCity, setHCity }) {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new OverallChart(chartRef.current, setSCity, setHCity));
    } else {
      chart.update(sCity);
    }
  }, [chart, sCity]);

  useEffect(() => {
    if (chart) {
      chart.updateHover(hCity);
    }
  }, [chart, hCity]);
  return <ChartContainer ref={chartRef} />;
}
