import * as d3 from 'd3';
import {
  LightGray100,
  LightGray350,
  Black,
  Background,
} from '../../../utils/colors';
import sido from '../../../utils/data/geo/korea_simplified.geojson';
import Hexagon from './Hexagon';
import cityData from '../../../utils/data/sample.csv';
import Tooltip from './Tooltip';
import { data } from '../../../utils/data/data';

export default function MapChart(element, setSCity, setHCity, sCity) {
  const store = {
    city: null,
    projection: null,
    cityData: null,
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
    .attr('transform', 'translate(75,120)');

  // create container

  // map
  const mapContainer = container.append('g');

  // tooltip
  const tooltipWidth = 180;

  // create the Tooltip and Chart elements
  const boxContainer = Tooltip(container, tooltipWidth);
  const Chart = new Hexagon(boxContainer, tooltipWidth, 1.2 * tooltipWidth);

  // load data and draw the map + events
  Promise.all([d3.json(sido)]).then(([d]) => {
    store.projection = store.projection = d3
      .geoMercator()
      .fitSize([width - 150, height - 150], d);

    store.cityData = data;

    const path = d3.geoPath().projection(store.projection);

    // Create a background rect for removing the tooltip when a user click empty space
    mapContainer
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
    mapContainer
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
      })
      .on('mouseout', function () {
        setHCity(null);
      })
      .on('click', function () {
        const city = d3.select(this).data()[0].properties.NAME;
        setSCity(city);
      });

    this.redraw(sCity);

    const anno = mapContainer.append('g').attr('class', 'anno');

    anno
      .selectAll('.properties')
      .data([
        'P: 생산성',
        'ID: 인프라 개발',
        'QoL: 삶의 질',
        'ESI: 공정과 사회통합',
        'ES: 환경적 지속가능성',
        'UGL: 도시화 거버넌스',
      ])
      .join('text')
      .text((d) => d)
      .attr('x', width - 200)
      .attr('y', (d, i) => height - 220 + i * 19)
      .style('font-size', '12px')
      .style('font-family', `'Nanum Gothic', sans-serif`);
  });

  this.redraw = (city) => {
    if (!city) {
      store.city = null;
      boxContainer.style('display', 'none');
      d3.selectAll('.sido').attr('fill', LightGray100);
      return;
    }
    const selected = d3.selectAll('.sido').filter((d, i) => {
      return d.properties.NAME === city;
    });
    if (store.projection) {
      const coord = store.projection(d3.geoCentroid(selected.data()[0]));

      boxContainer
        .attr(
          'transform',
          `translate(${[
            coord[0] - tooltipWidth / 2,
            coord[1] - 1.2 * tooltipWidth - 10,
          ]})`
        )
        .style('display', 'inline');

      boxContainer.select('.link text').on('click', (e) => {
        console.log(city);
      });

      d3.selectAll('.sido').attr('fill', LightGray100);

      store.city = city;
      selected.attr('fill', Black);

      const cityData = store.cityData.filter((c) => c.city === city)[0];
      Chart.draw(cityData);
    }
  };

  this.redrawHover = (city) => {
    if (city !== store.city) {
      d3.selectAll('.sido')
        .filter((d) => d.properties.NAME !== store.city)
        .attr('fill', LightGray100);

      const selected = d3
        .selectAll('.sido')
        .filter((d) => d.properties.NAME === city);
      selected.attr('fill', LightGray350);
    } else {
      d3.selectAll('.sido')
        .filter((d) => d.properties.NAME !== store.city)
        .attr('fill', LightGray100);
    }
  };
}
