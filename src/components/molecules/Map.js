import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MapChart from './chartDrawer/MapChart';
import { White } from '../../utils/colors';
import { tablet } from '../../utils/media';

const MapContainer = styled.div`
  width: 100%;
  background-color: ${White};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (${tablet}) {
    width: ${(window.innerHeight - 150) / 3 > 450
      ? window.innerHeight / 3
      : 450}px;
    max-width: 900px;
  }
`;

export default function Map({ setHCity, setSCity }) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      setMap(new MapChart(mapContainer.current, setSCity));
    } else {
      console.log(map);
    }
  }, [map]);

  return <MapContainer ref={mapContainer}></MapContainer>;
}
