import {
  BlueMyFavorite,
  LightGray350,
  White,
  Yellow,
} from '../../../utils/colors';

export default function Tooltip(element, tooltipWidth) {
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

  const link = boxContainer.append('g').attr('class', 'link');

  link
    .append('text')
    .text('더보기 (클릭)')
    .attr('x', tooltipWidth - 65)
    .attr('y', 20)
    .style('font-size', '10px')
    .style('cursor', 'pointer');

  boxContainer
    .append('line')
    .attr('stroke', BlueMyFavorite)
    .attr('x1', 10)
    .attr('x2', 30)
    .attr('y1', tooltipHeight - 30)
    .attr('y2', tooltipHeight - 30)
    .attr('stroke-width', 2);

  boxContainer
    .append('line')
    .attr('stroke', Yellow)
    .attr('x1', 10)
    .attr('x2', 30)
    .attr('y1', tooltipHeight - 15)
    .attr('y2', tooltipHeight - 15)
    .attr('stroke-dasharray', '4,4')
    .attr('stroke-width', 2);

  boxContainer
    .append('text')
    .text('평균')
    .attr('x', 36)
    .attr('y', tooltipHeight - 12)
    .style('font-size', '10px')
    .style('cursor', 'pointer');

  boxContainer
    .append('text')
    .attr('class', 'city-tag')
    .text('도시')
    .attr('x', 36)
    .attr('y', tooltipHeight - 26)
    .style('font-size', '10px')
    .style('cursor', 'pointer');

  return boxContainer;
}
