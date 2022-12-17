import * as d3 from 'd3';
import {
  LightGray100,
  LightGray350,
  Black,
  Black600,
  White,
  Background,
  Black400,
  Navy,
  Blue900,
  BlueMyFavorite,
  Yello,
} from '../../../utils/colors';
import sido from '../../../utils/data/geo/sido.geojson';
import Hexagon from './Hexagon';

export default function MapChart(element, setSCity, setHCity) {
  const store = {
    city: null,
  };
  const height = element.clientHeight;
  const width = element.clientWidth;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMinYMin');

  const container = svg
    .append('g')
    .attr('class', 'map')
    .attr('transform', 'translate(0,50)');

  // tooltip
  const tooltipWidth = 180;
  const boxContainer = Tooltip(svg, tooltipWidth);
  const Chart = new Hexagon(boxContainer, tooltipWidth, 1.2 * tooltipWidth);

  d3.json(sido).then((d) => {
    const projection = d3.geoMercator().fitSize([width, height], d);
    const path = d3.geoPath().projection(projection);

    // Create a background rect for removing the tooltip when a user click empty space
    container
      .append('rect')
      .style('width', '100%')
      .style('height', '100%')
      .attr('fill', Background)
      .on('click', function () {
        setSCity(null);
        store.city = null;
        d3.selectAll('.sido').attr('fill', LightGray100);
        boxContainer.style('display', 'none');
      });

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
        setHCity(city);
        if (city !== store.city) d3.select(this).attr('fill', LightGray350);
      })
      .on('mouseout', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        setHCity(null);
        if (city !== store.city) d3.select(this).attr('fill', LightGray100);
      })
      .on('click', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        const coord = projection(d3.geoCentroid(d3.select(this).data()[0]));
        boxContainer
          .attr(
            'transform',
            `translate(${[
              coord[0] - tooltipWidth / 2,
              coord[1] - 1.2 * tooltipWidth + 30,
            ]})`
          )
          .style('display', 'inline');

        d3.selectAll('.sido').attr('fill', LightGray100);
        if (city !== store.city) {
          setSCity(city);
          store.city = city;
          d3.select(this).attr('fill', Black);
        } else {
          setSCity(null);
          store.city = null;
          boxContainer.style('display', 'none');
        }
      });
  });

  const update = () => {
    console.log('test');
  };
}

function Tooltip(element, tooltipWidth) {
  const boxContainer = element
    .append('g')
    .attr('class', 'box')
    .style('display', 'none');

  const tooltipHeight = 1.2 * tooltipWidth;

  boxContainer
    .append('polygon')
    .attr(
      'points',
      `${0},${0} 
      ${0},${tooltipHeight} 
      ${tooltipWidth / 2 - 12},${tooltipHeight} 
      ${tooltipWidth / 2}, ${tooltipHeight + 14} 
      ${tooltipWidth / 2 + 12},${tooltipHeight} 
      ${tooltipWidth},${tooltipHeight} 
      ${tooltipWidth},${0}`
    )
    .attr('stroke', LightGray350)
    .attr('fill', White)
    .attr('opacity', 0.9)
    .style('pointer-events', 'none');

  return boxContainer;
}
