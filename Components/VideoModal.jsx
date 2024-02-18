import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import screenfull from "screenfull";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

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

const VideoModal = ({ selectedVideo, setSelectedVideo }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Default playback speed is 1x
  const [autoplay, setAutoplay] = useState(false); // Default to autoplay
  const [fullscreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    playerRef.current.seekTo(seekTime);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
    setDuration(progress.loadedSeconds);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setTimeout(() => {
      setShowVolumeControl(false);
    }, 600);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const onToggleFullscreen = () => {
    setFullScreen(true);
    screenfull.request(document.querySelector(".react-player"));
  };

  const onToggleAutoplay = () => {
    setAutoplay(true);
  };

  return (
    <div
      className="popupMain"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedVideo({
          isActive: false,
          source: selectedVideo?.source,
          thumb: selectedVideo?.thumb,
        });
      }}
    >
      <div
        className="popupMain__inner"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedVideo({
            isActive: true,
            source: selectedVideo?.source,
            thumb: selectedVideo?.thumb,
          });
        }}
      >
        <div className="videoModal">
          {isPlaying ? (
            <ReactPlayer
              ref={playerRef}
              url={selectedVideo?.source}
              playing={isPlaying}
              onProgress={handleProgress}
              className="react-player"
              volume={volume}
              loop={autoplay}
            />
          ) : (
            <div className="thumb">
              <Image
                src={
                  selectedVideo.thumb === "BigBuckBunny"
                    ? BigBuckBunny
                    : selectedVideo.thumb === "ElephantsDream"
                    ? ElephantsDream
                    : selectedVideo.thumb === "ForBiggerBlazes"
                    ? ForBiggerBlazes
                    : selectedVideo.thumb === "ForBiggerEscapes"
                    ? ForBiggerEscapes
                    : selectedVideo.thumb === "ForBiggerFun"
                    ? ForBiggerFun
                    : selectedVideo.thumb === "ForBiggerJoyrides"
                    ? ForBiggerJoyrides
                    : selectedVideo.thumb === "ForBiggerMeltdowns"
                    ? ForBiggerMeltdowns
                    : selectedVideo.thumb === "SubaruOutbackOnStreetAndDirt"
                    ? SubaruOutbackOnStreetAndDirt
                    : selectedVideo.thumb === "Sintel"
                    ? Sintel
                    : TearsOfSteel
                }
                alt=""
              />
            </div>
          )}

          <div className="video-control-bar">
            <div className="left">
              <button onClick={handlePlayPause}>
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
              />
            </div>
            {isPlaying ? (
              <div className="right">
                <div className="volume-control">
                  {showVolumeControl ? (
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      orient="vertical"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  ) : null}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setVolume(volume === 0 ? 0.5 : 0);
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setShowVolumeControl(true);
                    }}
                  >
                    {volume === 0 ? (
                      <FontAwesomeIcon icon={faVolumeMute} />
                    ) : volume > 0.5 ? (
                      <FontAwesomeIcon icon={faVolumeUp} />
                    ) : (
                      <FontAwesomeIcon icon={faVolumeDown} />
                    )}
                  </button>
                </div>
                <button onClick={onToggleFullscreen}>
                  {fullscreen ? (
                    <FontAwesomeIcon icon={faCompress} />
                  ) : (
                    <FontAwesomeIcon icon={faExpand} />
                  )}
                </button>

                <button onClick={onToggleAutoplay}>
                  {autoplay ? (
                    <FontAwesomeIcon icon={faPause} />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} />
                  )}
                </button>
                <select
                  value={playbackSpeed}
                  onChange={handleSpeedChange}
                  className=""
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
