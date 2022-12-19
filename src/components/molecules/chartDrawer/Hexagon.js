import { Black400, BlueMyFavorite, Yello } from "../../../utils/colors";

export default function Hexagon(element, width, height) {
  const hexagon = element.append("g").attr("id", "hexagon");

  const hexagonGrid = hexagon.append("g");

  const hexMean = hexagon.append("g");
  const hexChart = hexagon.append("g");
  const cx = 0.5 * width;
  const cy = 0.6 * height;
  const rScale = (d) => (d / 100) * 0.42 * width;

  // create Grid
  hexagonGrid
    .selectAll(".xAxis")
    .data([100, 80, 60, 40, 20])
    .join("polygon")
    .attr("stroke", Black400)
    .attr("stroke-dasharray", "3,3")
    .attr("stroke-width", 0.7)
    .attr("fill", "none")
    .attr(
      "points",
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
    .selectAll(".yAxis")
    .data([0, 1, 2, 3, 4, 5, 6])
    .join("line")
    .attr("transform", (d) => `rotate(${60 + d * 60}, ${cx}, ${cy})`)
    .attr("stroke-dasharray", "3,3")
    .attr("stroke", Black400)
    .attr("stroke-width", 0.7)
    .attr("x1", cx)
    .attr("y1", cy)
    .attr("x2", cx)
    .attr("y2", cy + rScale(100));

  const sample = {
    P: 80,
    ID: 85,
    QoL: 75,
    ESI: 78,
    ES: 85,
    UGL: 40,
  };

  (() => {
    let meanString = "";

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
        .append("circle")
        .attr("r", "3")
        .attr("fill", Yello)
        .attr("cx", cx + dx)
        .attr("cy", cy + dy);
      meanString += `${cx + dx},${cy + dy} `;
    });

    hexMean
      .append("polygon")
      .attr("points", meanString)
      .attr("stroke", Yello)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,4")
      .attr("fill", "none");

    hexMean
      .append("polygon")
      .attr("points", meanString)
      .attr("stroke", "none")
      .attr("fill", Yello)
      .attr("opacity", "0.3");
  })();

  this.draw = (data) => {
    const entries = Object.entries(data);
    let coordString = "";

    entries.forEach(([c, d], i) => {
      const { dx, dy } = convertCoord(c, d, rScale);
      hexChart
        .append("circle")
        .attr("r", "4.5")
        .attr("fill", BlueMyFavorite)
        .attr("cx", cx + dx)
        .attr("cy", cy + dy);
      coordString += `${cx + dx},${cy + dy} `;
    });

    hexChart
      .append("polygon")
      .attr("points", coordString)
      .attr("stroke", BlueMyFavorite)
      .attr("stroke-width", 2)
      .attr("fill", "none");

    hexChart
      .append("polygon")
      .attr("points", coordString)
      .attr("stroke", "none")
      .attr("fill", BlueMyFavorite)
      .attr("opacity", "0.3");
  };

  this.draw(sample);
}

function convertCoord(category, data, rScale) {
  switch (category) {
    case "P":
      return { dx: 0, dy: -rScale(data) };
    case "ID":
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: -Math.sin(Math.PI / 6) * rScale(data),
      };
    case "QoL":
      return {
        dx: Math.cos(Math.PI / 6) * rScale(data),
        dy: Math.sin(Math.PI / 6) * rScale(data),
      };
    case "ESI":
      return {
        dx: 0,
        dy: rScale(data),
      };
    case "ES":
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
