import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import WebMercatorViewport from "viewport-mercator-project";
import * as turfHelpers from "@turf/helpers";
import SVGPath from "./SVGPath";
import bbox from "@turf/bbox";

const examplePoints = [
  [-117.744431, 34.107205, 361.68],
  [-117.742611, 34.10719, 361.2],
  [-117.737908, 34.107104, 365.44],
  [-117.737687, 34.107065, 365.59],
  [-117.735545, 34.107029, 369.67],
  [-117.735547, 34.106959, 369.42],
  [-117.732307, 34.10693, 375.5],
  [-117.732277, 34.106947, 375.5],
  [-117.729301, 34.106942, 379.2],
  [-117.729232, 34.106914, 379.17],
  [-117.72905, 34.106914, 379.27],
  [-117.729061, 34.106475, 377.85],
  [-117.727463, 34.106477, 381.53],
  [-117.727113, 34.106546, 381.62],
  [-117.726281, 34.106566, 382.98],
  [-117.725828, 34.106463, 383.09],
  [-117.725447, 34.106233, 383.32],
  [-117.725187, 34.106461, 384.11],
  [-117.725018, 34.106523, 384.09],
  [-117.724822, 34.106566, 384.11],
  [-117.724598, 34.106536, 384.11],
  [-117.723488, 34.106201, 384.74],
  [-117.723217, 34.106172, 384.42],
  [-117.72026, 34.106149, 387.01],
  [-117.720274, 34.106475, 388.07],
  [-117.719773, 34.106478, 388.71],
  [-117.71979, 34.107011, 390.81],
  [-117.718425, 34.107009, 392.46],
  [-117.718426, 34.106943, 391.28],
];

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
    if (coords) {
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
          padding: 50,
          offset: [0, 0],
        }
      );

      setViewport(viewport);
      setPoints(coords);
    }
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
