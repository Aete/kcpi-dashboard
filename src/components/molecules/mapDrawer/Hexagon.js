import { Black400, BlueMyFavorite, Red, Yellow } from '../../../utils/colors';

export default function Hexagon(element, width, height) {
  const hexagon = element.append('g').attr('id', 'hexagon');

  const hexagonGrid = hexagon.append('g');
  const hexMean = hexagon.append('g');
  const hexChart = hexagon.append('g');

  const cx = 0.5 * width;
  const cy = 0.55 * height;
  const rScale = (d) => (d / 100) * 0.4 * width;

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

  const sampleMean = {
    p: 61,
    id: 67,
    qol: 64,
    esi: 69,
    es: 59,
    ugl: 73,
  };

  const drawChart = (element, data, color, main) => {
    let coordString = '';
    Object.entries(data)
      .filter((data) => data[0] !== 'city' && data[0] !== 'overall')
      .forEach(([c, d], i) => {
        const { dx, dy } = convertCoord(c, d, rScale);
        element
          .append('circle')
          .attr('r', main === true ? '4' : '2')
          .attr('fill', color)
          .attr('cx', cx + dx)
          .attr('cy', cy + dy);
        coordString += `${cx + dx},${cy + dy} `;
      });

    element
      .append('polygon')
      .attr('points', coordString)
      .attr('stroke', color)
      .attr('stroke-width', main === true ? '2' : '2')
      .attr('stroke-dasharray', main === true ? 'none' : '4,4')
      .attr('fill', 'none');

    element
      .append('polygon')
      .attr('points', coordString)
      .attr('stroke', 'none')
      .attr('fill', color)
      .attr('opacity', '0.3');
  };

  const drawText = (element) => {
    element
      .selectAll('.grid-text')
      .data(['P', 'ID', 'QoL', 'ESI', 'ES', 'UGL'])
      .join('text')
      .text((t) => t)
      .attr('text-anchor', 'middle')
      .attr('x', (t) => cx + convertCoord(t, 120, rScale).dx)
      .attr('y', (t) => cy + convertCoord(t, 120, rScale).dy)
      .attr('dy', 3)
      .style('font-family', "'Nanum Gothic', sans-serif")
      .style('font-size', '10px');
  };

  drawChart(hexMean, sampleMean, Yellow, false);
  drawText(hexMean);

  this.draw = (data) => {
    const city = data.city;

    hexChart.selectAll('polygon').remove();
    hexChart.selectAll('circle').remove();
    hexChart.select('text').remove();

    drawChart(hexChart, data, BlueMyFavorite, true);

    hexChart
      .append('text')
      .attr('id', 'tooltip-title')
      .text(`${city}: ${data.overall}점`)
      .attr('x', 10)
      .attr('y', 20)
      .style('font-family', "'Nanum Gothic', sans-serif")
      .style('font-weight', 700)
      .style('font-size', '13px');

    element.select('.city-tag').text(city);
  };
}

function convertCoord(category, data, rScale) {
  switch (category) {
    case 'p':
    case 'P':
      return { dx: 0, dy: -rScale(data) };

    case 'ID':
    case 'id':
    case 'infra':
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: -Math.sin(Math.PI / 6) * rScale(data),
      };

    case 'QoL':
    case 'qol':
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: Math.sin(Math.PI / 6) * rScale(data),
      };

    case 'ESI':
    case 'esi':
      return {
        dx: 0,
        dy: rScale(data),
      };

    case 'ES':
    case 'es':
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
