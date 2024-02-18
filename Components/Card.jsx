import React from "react";
import Image from "next/image";

import {
  BigBuckBunny,
  ElephantsDream,
  ForBiggerBlazes,
  ForBiggerEscapes,
  ForBiggerFun,
  ForBiggerJoyrides,
  ForBiggerMeltdowns,
  Sintel,
  SubaruOutbackOnStreetAndDirt,
  TearsOfSteel,
} from "../assets/images/index";

const Card = ({ video, setSelectedVideo }) => {
  return (
    <div
      className="card"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedVideo({
          isActive: true,
          source: video?.sources[0],
          thumb: video?.thumb,
        });
      }}
    >
      <div className="card--heading">
        <h3>{video.title}</h3>
      </div>
      <div className="card--image">
        <Image
          src={
            video.thumb === "BigBuckBunny"
              ? BigBuckBunny
              : video.thumb === "ElephantsDream"
              ? ElephantsDream
              : video.thumb === "ForBiggerBlazes"
              ? ForBiggerBlazes
              : video.thumb === "ForBiggerEscapes"
              ? ForBiggerEscapes
              : video.thumb === "ForBiggerFun"
              ? ForBiggerFun
              : video.thumb === "ForBiggerJoyrides"
              ? ForBiggerJoyrides
              : video.thumb === "ForBiggerMeltdowns"
              ? ForBiggerMeltdowns
              : video.thumb === "SubaruOutbackOnStreetAndDirt"
              ? SubaruOutbackOnStreetAndDirt
              : video.thumb === "Sintel"
              ? Sintel
              : TearsOfSteel
          }
          fill="true"
          alt="imgs"
        />
      </div>
      <div className="card--des">
        <h3>{video.subtitle}</h3>
        <p>{video?.description}</p>
      </div>
    </div>
  );
};

export default Card;
