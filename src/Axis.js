import React from "react";

const Axis = ({ x, y, length, horizontal }) => {

  const coords = {
    x1: x,
    y1: y,
    x2: horizontal ? x + length : x,
    y2: horizontal ? y : length + y
  };
  return (
    <g>
      <line {...coords} stroke="green" strokeWidth={2} />

    </g>
  );
};


export default Axis;