import React, { useState, useEffect } from "react";
import { videoData } from "../../assets/constant/videoData";
import Header from "../../Components/Header";
import Card from "../../Components/Card";
import VideoModal from "../../Components/VideoModal";
import EmptyDataPage from "../../Components/EmptyData";

const PlayList = () => {
  const [videoPlayList, setVideoPlayList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({
    isActive: false,
    source: null,
    thumb: null,
  });

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getAllVideoList = async () => {
    setVideoPlayList(videoData);
  };

  const handleFilter = (inputValue) => {
    const lowerSearchText = inputValue.toLowerCase();
    setInputValue(lowerSearchText);
    let videoPlayListCopy = [...videoPlayList?.categories[0]?.videos];
    let filteredVideosArray = videoPlayListCopy?.filter((value, index) => {
      const lowerSearchText = inputValue.toLowerCase();
      return (
        value.title.toLowerCase().includes(lowerSearchText) ||
        value.subtitle.toLowerCase().includes(lowerSearchText)
      );
    });
    setFilteredVideos(filteredVideosArray);
  };

  useEffect(() => {
    getAllVideoList();
  }, []);

  useEffect(() => {
    if (videoPlayList && Object.keys(videoPlayList)?.length)
      setFilteredVideos(videoPlayList?.categories[0]?.videos);
  }, [videoPlayList]);

  return (
    <div className="playList">
      <Header />
      {videoPlayList?.categories?.length ? (
        <>
          <div className="playList__content">
            <div className="playList__content__header">
              <h3>{videoPlayList?.categories[0]?.name}</h3>
              <div className="playList__content__header__inputSection">
                <input
                  value={inputValue}
                  onChange={(e) => {
                    e.preventDefault();
                    handleFilter(e.target.value);
                  }}
                  placeholder="Search Movies.."
                />
              </div>
            </div>
            <div className="playList__content__data">
              {filteredVideos?.length ? (
                filteredVideos?.map((video, index) => {
                  return (
                    <Card
                      video={video}
                      key={index}
                      setSelectedVideo={setSelectedVideo}
                    />
                  );
                })
              ) : (
                <EmptyDataPage />
              )}
            </div>
          </div>
        </>
      ) : null}

      {selectedVideo?.isActive ? (
        <VideoModal
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
        />
      ) : null}
    </div>
  );
};

export default PlayList;
