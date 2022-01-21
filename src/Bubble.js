import React from "react";

const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

const Bubble = ({ x, y, radius, title }) => {
  let color = randomHex();
  return (<g onMouseEnter={() => { console.log(title) }}>
    <circle cx={x} cy={y} r={radius - 1} fill={'none'} stroke-width={2} stroke={color} stroke-opacity={0.4} />
    <circle cx={x} cy={y} r={radius} fill={color} opacity={0.3} />
    <text x={x - radius / 3} y={y} style={{ fontSize: "14px" }}>
      {title}
    </text>
  </g>)
};

export default Bubble;