import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MapChart from "./chartDrawer/MapChart";
import { Background } from "../../utils/colors";
import { tablet } from "../../utils/media";

const MapContainer = styled.div`
  width: 100%;
  background-color: ${Background};

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
