import * as d3 from "d3";
import {
  LightGray100,
  LightGray350,
  Black,
  White,
  Background,
} from "../../../utils/colors";
import sido from "../../../utils/data/geo/sido.geojson";

export default function MapChart(element, setCity) {
  const store = {
    city: null,
  };
  const height = element.clientHeight;
  const width = element.clientWidth;

  const svg = d3
    .select(element)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("cursor", "pointer");

  const container = svg
    .append("g")
    .attr("class", "map")
    .attr("transform", "translate(0,50)");

  const boxContainer = svg
    .append("g")
    .attr("class", "box")
    .style("display", "none");

  boxContainer
    .append("polygon")
    .attr(
      "points",
      `${0},${0} 
      ${0},${0.3 * height} 
      ${(0.4 * width) / 2 - 12},${0.3 * height} 
      ${(0.4 * width) / 2}, ${0.3 * height + 14} 
      ${(0.4 * width) / 2 + 12},${0.3 * height} 
      ${0.4 * width},${0.3 * height} 
      ${0.4 * width},${0}`
    )
    .attr("stroke", LightGray350)
    .attr("fill", White)
    .attr("opacity", 0.6)
    .style("pointer-events", "none");

  d3.json(sido).then((d) => {
    const projection = d3.geoMercator().fitSize([width, height], d);
    const path = d3.geoPath().projection(projection);

    container
      .append("rect")
      .style("width", "100%")
      .style("height", "100%")
      .attr("fill", Background)
      .on("click", function () {
        setCity(null);
        store.city = null;
        d3.selectAll(".sido").attr("fill", LightGray100);
        boxContainer.style("display", "none");
      });
    // drawing map
    container
      .selectAll(".sido")
      .data(d.features)
      .join("path")
      .attr("class", "sido")
      .attr("d", path)
      .attr("fill", LightGray100)
      .attr("stroke", "#ececec")
      .on("mouseover", function () {
        const city = d3.select(this).data()[0].properties.NAME;
        if (city !== store.city) d3.select(this).attr("fill", LightGray350);
      })
      .on("mouseout", function () {
        const city = d3.select(this).data()[0].properties.NAME;
        if (city !== store.city) d3.select(this).attr("fill", LightGray100);
      })
      .on("click", function () {
        const city = d3.select(this).data()[0].properties.NAME;
        const coord = projection(d3.geoCentroid(d3.select(this).data()[0]));
        boxContainer
          .attr(
            "transform",
            `translate(${[
              coord[0] - (0.4 * width) / 2,
              coord[1] - 0.3 * height + 30,
            ]})`
          )
          .style("display", "inline");
        d3.selectAll(".sido").attr("fill", LightGray100);
        if (city !== store.city) {
          setCity(city);
          store.city = city;
          d3.select(this).attr("fill", Black);
        } else {
          setCity(null);
          store.city = null;
        }
      });
  });

  this.update = () => {};
}
