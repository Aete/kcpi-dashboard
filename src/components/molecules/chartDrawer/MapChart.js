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

function Hexagon(element, width, height) {
  const hexagon = element.append('g').attr('id', 'hexagon');

  const hexagonGrid = hexagon.append('g');

  const hexMean = hexagon.append('g');
  const hexChart = hexagon.append('g');
  const cx = 0.5 * width;
  const cy = 0.6 * height;
  const rScale = (d) => (d / 100) * 0.42 * width;

  // create Grid
  hexagonGrid
    .selectAll('.xAxis')
    .data([100, 80, 60, 40, 20])
    .join('polygon')
    .attr('stroke', Black400)
    .attr('stroke-dasharray', '3,3')
    .attr('stroke-width', 0.7)
    .attr('fill', 'none')
    .attr(
      'points',
      (d) => `
      ${cx},${cy + rScale(d)} 
      ${cx + Math.cos(Math.PI / 6) * rScale(d)}, ${
        cy + Math.sin(Math.PI / 6) * rScale(d)
      } 
      ${cx + Math.cos(Math.PI / 6) * rScale(d)},${
        cy - Math.sin(Math.PI / 6) * rScale(d)
      } 
      ${cx},${cy - rScale(d)} 
      ${cx + Math.cos((Math.PI / 6) * 5) * rScale(d)},${
        cy - Math.sin(Math.PI / 6) * rScale(d)
      } 
      ${cx + Math.cos((Math.PI / 6) * 5) * rScale(d)},${
        cy + Math.sin(Math.PI / 6) * rScale(d)
      }`
    );

  hexagonGrid
    .selectAll('.yAxis')
    .data([0, 1, 2, 3, 4, 5, 6])
    .join('line')
    .attr('transform', (d) => `rotate(${60 + d * 60}, ${cx}, ${cy})`)
    .attr('stroke-dasharray', '3,3')
    .attr('stroke', Black400)
    .attr('stroke-width', 0.7)
    .attr('x1', cx)
    .attr('y1', cy)
    .attr('x2', cx)
    .attr('y2', cy + rScale(100));

  const sample = {
    P: 80,
    ID: 85,
    QoL: 75,
    ESI: 78,
    ES: 85,
    UGL: 40,
  };

  (() => {
    let meanString = '';

    const sampleMean = {
      P: 60,
      ID: 60,
      QoL: 60,
      ESI: 60,
      ES: 60,
      UGL: 60,
    };

    Object.entries(sampleMean).forEach(([c, d], i) => {
      const { dx, dy } = convertCoord(c, d, rScale);
      hexMean
        .append('circle')
        .attr('r', '3')
        .attr('fill', Yello)
        .attr('cx', cx + dx)
        .attr('cy', cy + dy);
      meanString += `${cx + dx},${cy + dy} `;
    });

    hexMean
      .append('polygon')
      .attr('points', meanString)
      .attr('stroke', Yello)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')
      .attr('fill', 'none');

    hexMean
      .append('polygon')
      .attr('points', meanString)
      .attr('stroke', 'none')
      .attr('fill', Yello)
      .attr('opacity', '0.3');
  })();

  this.draw = (data) => {
    const entries = Object.entries(data);
    let coordString = '';

    entries.forEach(([c, d], i) => {
      const { dx, dy } = convertCoord(c, d, rScale);
      hexChart
        .append('circle')
        .attr('r', '4.5')
        .attr('fill', BlueMyFavorite)
        .attr('cx', cx + dx)
        .attr('cy', cy + dy);
      coordString += `${cx + dx},${cy + dy} `;
    });

    hexChart
      .append('polygon')
      .attr('points', coordString)
      .attr('stroke', BlueMyFavorite)
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    hexChart
      .append('polygon')
      .attr('points', coordString)
      .attr('stroke', 'none')
      .attr('fill', BlueMyFavorite)
      .attr('opacity', '0.3');
  };

  this.draw(sample);
}

function convertCoord(category, data, rScale) {
  switch (category) {
    case 'P':
      return { dx: 0, dy: -rScale(data) };
    case 'ID':
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: -Math.sin(Math.PI / 6) * rScale(data),
      };
    case 'QoL':
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: Math.sin(Math.PI / 6) * rScale(data),
      };
    case 'ESI':
      return {
        dx: 0,
        dy: rScale(data),
      };
    case 'ES':
      return {
        dx: -Math.cos(Math.PI / 6) * rScale(data),
        dy: Math.sin(Math.PI / 6) * rScale(data),
      };
    default:
      return {
        dx: -Math.cos(Math.PI / 6) * rScale(data),
        dy: -Math.sin(Math.PI / 6) * rScale(data),
      };
  }
}
