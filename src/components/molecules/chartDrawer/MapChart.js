import * as d3 from 'd3';
import { LightGray100, LightGray350, Black } from '../../../utils/colors';
import sido from '../../../utils/data/geo/sido.geojson';

export default function MapChart(element, setCity) {
  const store = {
    city: null,
  };
  const margin = { top: 20, bottom: 20, right: 20, left: 20 };
  const height = element.clientHeight - margin.top - margin.bottom;
  const width = element.clientWidth - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const container = svg.append('g').attr('class', 'map');

  const boxContainer = svg.append('g').attr('class', 'box');

  boxContainer
    .append('rect')
    .attr('width', 0.5 * width)
    .attr('height', 0.3 * height)
    .attr('fill', 'White')
    .attr('visibility', 'visible');

  d3.json(sido).then((d) => {
    const projection = d3.geoMercator().fitSize([width, height], d);
    const path = d3.geoPath().projection(projection);

    // drawing map
    container
      .selectAll('.sido')
      .data(d.features)
      .join('path')
      .attr('class', 'sido')
      .attr('d', path)
      .attr('fill', LightGray100)
      .attr('stroke', '#ececec')
      .on('mouseover', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        if (city !== store.city) d3.select(this).attr('fill', LightGray350);
      })
      .on('mouseout', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        if (city !== store.city) d3.select(this).attr('fill', LightGray100);
      })
      .on('click', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        boxContainer.attr('width');
        d3.selectAll('.sido').attr('fill', LightGray100);
        if (city !== store.city) {
          setCity(city);
          store.city = city;
          d3.select(this).attr('fill', Black);
        } else {
          setCity(null);
          store.city = null;
        }
      });
  });

  this.update = () => {};
}
