import React from "react";
import { SVGOverlay } from "react-map-gl";

const SvgPath = ({ points }) => {
  console.log(points);
  const redraw = ({ project }) => {
    const path = points.reduce((accum, point, i) => {
      const [x, y] = project([point[0], point[1]]);
      if (i === 0) {
        accum += `M ${x} ${y} `;
      } else {
        accum += `L ${x} ${y} `;
      }
      return accum;
    }, "");

    return (
      <path
        d={path}
        stroke="#667eea"
        strokeWidth="4"
        fill="none"
        className="route-path"
      />
    );
  };

  return <SVGOverlay redraw={redraw} />;
};

export default SvgPath;
