import { useState } from 'react';
import styled from 'styled-components';
import { Background, Black } from '../../utils/colors';

const CityChartContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.display === 'y' ? 'block' : 'none')};
  background-color: ${Background};
  opacity: 0.85;
  z-index: 3;
`;

export default function CityChart({ display, handleModule }) {
  return (
    <CityChartContainer display={display} onClick={handleModule}>
      test
    </CityChartContainer>
  );
}
