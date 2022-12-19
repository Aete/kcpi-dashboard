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

export default function MapChart(element, setSCity, setHCity) {
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
  Promise.all([d3.csv(cityData, d3.autoType), d3.json(sido)]).then(
    ([citySample, d]) => {
      store.projection = store.projection = d3
        .geoMercator()
        .fitSize([width - 150, height - 150], d);

      store.cityData = citySample;

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
          if (city !== store.city) d3.select(this).attr('fill', LightGray350);
        })
        .on('mouseout', function () {
          const city = d3.select(this).data()[0].properties.NAME;
          setHCity(null);
          if (city !== store.city) d3.select(this).attr('fill', LightGray100);
        })
        .on('click', function () {
          const city = d3.select(this).data()[0].properties.NAME;
          setSCity(city);
        });
    }
  );

  this.redraw = (city) => {
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

      d3.selectAll('.sido').attr('fill', LightGray100);

      if (city !== store.city) {
        store.city = city;
        selected.attr('fill', Black);
        const cityData = store.cityData.filter((c) => c.city === city)[0];
        Chart.draw(cityData);
      } else {
        store.city = null;
        boxContainer.style('display', 'none');
      }
    }
  };
}
