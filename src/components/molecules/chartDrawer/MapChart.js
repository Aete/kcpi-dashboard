import * as d3 from 'd3';
import { thresholdScott } from 'd3';
import {
  BlueGray100,
  DarkNavy,
  LightGray350,
  White,
} from '../../../utils/colors';
import sido from '../../../utils/data/geo/sido.geojson';

export default function MapChart(element) {
  const margin = { top: 20, bottom: 20, right: 20, left: 20 };
  const height = element.clientHeight - margin.top - margin.bottom;
  const width = element.clientWidth - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const container = svg.append('g').attr('class', 'map');

  let clicked = false;

  d3.json(sido).then((d) => {
    console.log(d);
    const projection = d3.geoMercator().fitSize([width, height], d);
    const path = d3.geoPath().projection(projection);
    container
      .selectAll('.sido')
      .data(d.features)
      .join('path')
      .attr('class', 'sido')
      .attr('d', path)
      .attr('fill', White)
      .attr('stroke', LightGray350)
      .on('mouseover', function () {
        d3.select(this).attr('fill', BlueGray100);
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', White);
      })
      .on('click', function () {
        d3.select(this).attr('fill', DarkNavy);
      });
  });

  this.update = () => {};
}
