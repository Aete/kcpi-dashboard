import { LightGray350, White } from '../../../utils/colors';

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

  return boxContainer;
}
