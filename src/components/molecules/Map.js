import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { White } from '../../utils/colors';
import { tablet } from '../../utils/media';

const MapContainer = styled.div`
  width: 100%;
  background-color: ${White};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (${tablet}) {
    width: 420px;
  }
`;

export default function Map({ hoveredCity, SelectedCity }) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      setMap('메롱');
    } else {
      console.log('testing');
    }
  }, [map]);

  return <MapContainer ref={mapContainer}></MapContainer>;
}
