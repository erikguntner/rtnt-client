import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import WebMercatorViewport from "viewport-mercator-project";
import * as turfHelpers from "@turf/helpers";
import SVGPath from "./SVGPath";
import bbox from "@turf/bbox";

const paramsToObject = (entries) => {
  let result = {};
  for (let entry of entries) {
    const [key, value] = entry;
    console.log(value);
    result[key] = JSON.parse(value);
  }
  return result;
};

const Map = ({ router }) => {
  const [viewport, setViewport] = useState({});
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const { coords } = paramsToObject(params);
    const line = turfHelpers.lineString(coords);
    var bBox = bbox(line);

    // set viewport dimensions and position
    const viewport = new WebMercatorViewport({
      width: 640,
      height: 360,
    }).fitBounds(
      [
        [bBox[0], bBox[1]],
        [bBox[2], bBox[3]],
      ],
      {
        padding: 0,
        offset: [0, 0],
      }
    );

    setViewport(viewport);
    setPoints(coords);
  }, []);

  return (
    <StaticMap
      width={640}
      height={360}
      {...viewport}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
    >
      <SVGPath {...{ points }} />
    </StaticMap>
  );
};

export default Map;
