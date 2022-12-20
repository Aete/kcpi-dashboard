import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MapChart from './mapDrawer/MapChart';
import { Background, Black } from '../../utils/colors';
import { pc, tablet } from '../../utils/media';

const MapContainer = styled.div`
  width: 100%;
  background-color: ${Background};
  height: calc(100vh - 380px);
  @media screen and (${pc}) {
    width: 450px;
    height: calc(100vh - 150px);
  }
`;

export default function Map({ sCity, hCity, setHCity, setSCity }) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      setMap(new MapChart(mapContainer.current, setSCity, setHCity, sCity));
    } else {
      map.redraw(sCity);
    }
  }, [map, sCity]);

  useEffect(() => {
    if (map) {
      hCity && map.redrawHover(hCity);
    }
  }, [map, hCity]);

  return <MapContainer ref={mapContainer}></MapContainer>;
}
