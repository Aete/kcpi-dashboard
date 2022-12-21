import * as d3 from 'd3';
import {
  Black400,
  BlueMyFavorite,
  Red,
  Yellow,
  LightGray350,
  Black,
} from '../../../../utils/colors';

import { calculateOverallEntry, data } from '../../../../utils/data/data';

export default function OverallChart(element, setSCity, setHCity) {
  const calculateAvg = (d, attr) => {
    return d.reduce((acc, c) => acc + c[attr], 0) / d.length;
  };

  const averageObject = [
    'overall',
    'p',
    'infra',
    'qol',
    'esi',
    'es',
    'ugl',
  ].reduce((acc, attr) => {
    acc[attr] = calculateAvg(data, attr);
    return acc;
  }, {});

  averageObject.city = '평균';

  const dataProcessed = [...data, averageObject].sort(
    (a, b) => b.overall - a.overall
  );

  const cities = dataProcessed.map((d) => d.city);

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
    .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
    .style('font-size', '11px');

  const yAxis = container.append('g').attr('id', 'yAxis');
  const bar = container.append('g');
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

  bar
    .selectAll('rect')
    .data(dataProcessed)
    .enter()
    .append('rect')
    .attr('class', (d) => (d.city !== '평균' ? 'bar' : 'barAvg'))
    .attr('width', xScale.bandwidth())
    .attr(
      'height',
      (d) => height - yScale(d.overall) - margin.top - margin.bottom
    )
    .attr('x', (d) => xScale(d.city))
    .attr('y', (d) => yScale(d.overall))
    .attr('fill', (d) => (d.city !== '평균' ? LightGray350 : Yellow))
    .attr('opacity', 0.9);

  bar
    .selectAll('.anno')
    .data(dataProcessed)
    .join('text')
    .attr('class', (d) => (d.city !== '평균' ? 'bar-anno' : 'bar-anno-avg'))
    .attr('x', (d) => xScale(d.city) + 5)
    .attr('y', (d) => yScale(d.overall) - 8)
    .style('font-size', '12px')
    .style('font-weight', (d) => (d.city === '평균' ? 700 : 400))
    .attr('fill', (d) => (d.city === '평균' ? Yellow : LightGray350))
    .text((d) => d.overall);

  bar
    .selectAll('.bar')
    .on('click', function () {
      const city = d3.select(this).data()[0].city;
      if (city !== store.city) {
        setSCity(city);
        return;
      } else {
        setSCity(null);
      }
    })
    .on('mouseover', function () {
      const city = d3.select(this).data()[0].city;
      setHCity(city);
      if (city !== store.city) d3.select(this).attr('fill', Red);
    })
    .on('mouseout', function () {
      const city = d3.select(this).data()[0].city;

      setHCity(null);
      if (city !== store.city) d3.select(this).attr('fill', LightGray350);
    });

  this.update = (sCity) => {
    if (!sCity) {
      d3.selectAll('.bar').attr('fill', LightGray350);
      store.city = null;
      return;
    }

    const selected = d3.selectAll('.bar').filter((d) => d.city === sCity);
    const selectedAnno = d3
      .selectAll('.bar-anno')
      .filter((d) => d.city === sCity);

    if (sCity !== store.city) {
      d3.selectAll('.bar').attr('fill', LightGray350);
      selected.attr('fill', BlueMyFavorite);
      selectedAnno.attr('fill', BlueMyFavorite).style('font-weight', 700);
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
        .filter((d) => d.city !== store.city)
        .attr('fill', LightGray350);

      d3.selectAll('.bar-anno')
        .filter((d) => d.city !== store.city)
        .attr('fill', LightGray350)
        .style('font-weight', 400);

      const selected = d3.selectAll('.bar').filter((d) => d.city === city);
      const selectedAnno = d3
        .selectAll('.bar-anno')
        .filter((d) => d.city === city);

      selected.attr('fill', Red);
      selectedAnno.attr('fill', Red).style('font-weight', 700);
    } else {
      d3.selectAll('.bar')
        .filter((d) => d.city !== store.city)
        .attr('fill', Black400);
    }
  };
}
