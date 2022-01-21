import _, { range } from "lodash";
import React from "react";

import Axis from "./Axis";
import Bubble from "./Bubble";

const BarChart = ({ data }) => {
  const massagedData = data.map((datum) =>
    Object.assign({}, datum, { salary: datum.salary })
  );

  const getMin = (key) => {
    let mathMax = Number.MAX_VALUE;
    let maxValue = 0;
    massagedData.forEach((element) => {
      if (element[key] < mathMax) {
        maxValue = element[key];
        mathMax = element[key];
      }
    });
    return maxValue;
  };

  const getMax = (key) =>
    massagedData.reduce((acc, cur) => {
      return cur[key] > acc ? cur[key] : acc;
    }, 0);

  const maxRadius = getMax("headcount");

  const mostSalary = getMax("salary");

  const mostCompRatio = getMax("compratio");

  let minCompRatio = getMin("compratio");
  let minSalary = getMin("salary");

  let rangeY = _.range(minSalary, mostSalary, 20);
  let rangeX = _.range(minCompRatio, mostCompRatio, 20);
  rangeX.push(mostCompRatio);
  rangeY.push(mostSalary);



  const chartHeight = mostSalary + maxRadius / 2;
  const chartWidth = (mostCompRatio - minCompRatio) * 10 + maxRadius + 100;
  return (
    <div
      style={{
        position: "relative",
        height: chartHeight,
        width: chartWidth,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <svg
          viewBox={`${minSalary - maxRadius} ${minCompRatio} ${chartWidth + 30
            } ${chartHeight + 30}`}
          width={chartWidth}
          height={chartHeight}
        >
          <text
            x={(mostCompRatio + minCompRatio) / 2}
            y={chartHeight + minCompRatio - 2 + 30}
            style={{ fontSize: "12px" }}
          >
            {'Compratio'}
          </text>
          {rangeX.map((val) => (
            <text
              x={(val - minCompRatio) * 10}
              y={chartHeight + minCompRatio - 2 + 20}
              style={{ fontSize: "12px" }}
            >
              {val}
            </text>
          ))}

          <Axis
            x={minSalary - maxRadius}
            y={chartHeight + minCompRatio - 2}
            length={chartWidth}
            horizontal={true}
          />
          {rangeY.reverse().map((val) => (
            <text
              x={minSalary - maxRadius - 20}
              y={chartHeight - val}
              style={{ fontSize: "12px", color: "red" }}
            >
              {val}
            </text>
          ))}
          <Axis
            x={minSalary - maxRadius + 2}
            y={0}
            length={chartHeight + minCompRatio}
            horizontal={false}
          />

          {data.map((datum, index) => {
            return (
              <Bubble
                key={datum.title}
                x={datum.compratio * 10 - minCompRatio * 10}
                y={chartHeight - datum.salary}
                radius={datum.headcount / 2}
                title={datum.title}
                xLabel={datum.compratio}
                yLabel={datum.salary}
              />
            );
          })}
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-52px",
          width: "100%",
          left: "35px",
          justifyContent: "space-around",
        }}
      ></div>
    </div>
  );
};

export default BarChart;
