import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MapChart from './chartDrawer/MapChart';
import { Background, Black } from '../../utils/colors';
import { tablet } from '../../utils/media';

const MapContainer = styled.div`
  width: 100%;
  background-color: ${Background};

  @media screen and (${tablet}) {
    width: 50%;
    max-width: 450px;
  }
`;

export default function Map({ setHCity, setSCity }) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      setMap(new MapChart(mapContainer.current, setSCity, setHCity));
    } else {
      window.addEventListener('resize', map.redraw);
    }
  }, [map]);

  return <MapContainer ref={mapContainer}></MapContainer>;
}
