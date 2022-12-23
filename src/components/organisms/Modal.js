import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Background, BlueGray50 } from '../../utils/colors';
import { tablet } from '../../utils/media';
import RadialBar from '../molecules/charts/main/modal/RadialBar';

const CityChartContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => props.display};
  background-color: ${Background};
  opacity: 0.85;
  z-index: 3;
  justify-content: center;
  align-items: center;
`;

const CityChartBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${BlueGray50};

  @media screen and (${tablet}) {
    width: 70%;
    height: 70%;
    border-radius: 30px;
  }
`;

export default function CityChart({ display, handleModule, sCity }) {
  const [chart, setChart] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new RadialBar(modalRef.current));
    } else {
      chart.update(sCity);
    }
  }, [chart, sCity]);
  return (
    <CityChartContainer display={display} onClick={handleModule}>
      <CityChartBox ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {sCity}
      </CityChartBox>
    </CityChartContainer>
  );
}
