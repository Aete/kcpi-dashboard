import * as d3 from 'd3';
import {
  Black400,
  BlueMyFavorite,
  LightGray100,
  Red,
  Yellow,
  LightGray350,
} from '../../../../utils/colors';

import { calculateOverallEntry, data } from '../../../../utils/data/data';

export default function OverallChart(element, setSCity, setHCity) {
  const height = element.clientHeight;
  const width = element.clientWidth;
  const margin = { top: 10, bottom: 20, right: 15, left: 15 };
  const store = {
    city: null,
  };

  const svg = d3
    .select(element)
    .append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height);

  const container = svg
    .append('g')
    .attr('class', 'chart')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${height - margin.top - margin.bottom})`);

  const yAxis = container.append('g').attr('id', 'yAxis');
  const bar = container.append('g');
  const cities = data.map((d) => d.city);
  const xScale = d3
    .scaleBand()
    .domain(cities)
    .range([0, width - margin.right - margin.left])
    .paddingOuter(0.2)
    .paddingInner(0.3);

  const xAxisFunction = d3.axisBottom(xScale);
  xAxis.transition().duration(500).call(xAxisFunction);
  xAxis.selectAll('path').remove();
  xAxis.selectAll('text').style('font-family', "'Nanum Gothic', sans-serif");

  const yScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.top - margin.bottom, 0]);

  yAxis
    .selectAll('.grid')
    .data([0, 20, 40, 60, 80])
    .join('line')
    .attr('id', (d) => d)
    .attr('x1', 0)
    .attr('x2', width - margin.right - margin.left)
    .attr('y1', (d) => yScale(d))
    .attr('y2', (d) => yScale(d))
    .attr('stroke', (d) => (d > 0 ? Black400 : '#000'))
    .attr('stroke-width', (d) => (d > 0 ? 1 : 0.5))
    .attr('stroke-dasharray', (d) => (d > 0 ? '4,4' : 'none'));

  const overallAvg =
    calculateOverallEntry(data).reduce((acc, item) => (acc += item[1]), 0) /
    data.length;

  bar
    .selectAll('rect')
    .data(calculateOverallEntry(data))
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', xScale.bandwidth())
    .attr(
      'height',
      ([_, value]) => height - yScale(value) - margin.top - margin.bottom
    )
    .attr('x', ([key, _]) => xScale(key))
    .attr('y', ([_, value]) => yScale(value))
    .attr('fill', LightGray350)
    .attr('opacity', 0.9)
    .on('click', function () {
      const city = d3.select(this).data()[0][0];
      if (city !== store.city) {
        setSCity(city);
        return;
      } else {
        setSCity(null);
      }
    })
    .on('mouseover', function () {
      const city = d3.select(this).data()[0][0];
      setHCity(city);
      if (city !== store.city) d3.select(this).attr('fill', Red);
    })
    .on('mouseout', function () {
      const city = d3.select(this).data()[0][0];
      setHCity(null);
      if (city !== store.city) d3.select(this).attr('fill', LightGray350);
    });

  bar
    .append('line')
    .attr('stroke', Yellow)
    .attr('x1', 0)
    .attr('x2', width - margin.right - margin.left)
    .attr('y1', yScale(overallAvg))
    .attr('y2', yScale(overallAvg))
    .attr('stroke-dasharray', '8,8')
    .attr('stroke-width', 2);

  this.update = (sCity) => {
    if (!sCity) {
      d3.selectAll('.bar').attr('fill', LightGray350);
      store.city = null;
      return;
    }

    const selected = d3.selectAll('.bar').filter((d) => d[0] === sCity);

    if (sCity !== store.city) {
      d3.selectAll('.bar').attr('fill', LightGray350);
      selected.attr('fill', BlueMyFavorite);
      store.city = sCity;
    } else {
      d3.selectAll('.bar').attr('fill', LightGray350);
      store.city = null;
      return;
    }
  };

  this.updateHover = (city) => {
    if (city !== store.city) {
      d3.selectAll('.bar')
        .filter((d) => d[0] !== store.city)
        .attr('fill', LightGray350);
      const selected = d3.selectAll('.bar').filter((d) => d[0] === city);
      selected.attr('fill', Red);
    } else {
      d3.selectAll('.bar')
        .filter((d) => d[0] !== store.city)
        .attr('fill', Black400);
    }
  };
}
