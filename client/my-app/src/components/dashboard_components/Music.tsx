import "./Music.css";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as React from 'react';
import Draggable from "react-draggable";



export default function Music(){
  const musicTracks = [
    {
      name: "Memories",
        src: "https://www.chosic.com/wp-content/uploads/2022/10/Colorful-Flowers.mp3"
    },
    {
      name: "Way Home",
        src: "https://www.chosic.com/wp-content/uploads/2022/10/Way-Home.mp3"
    },
    {
      name: "Morning Star",
        src: "https://www.chosic.com/wp-content/uploads/2022/10/Morning-Station.mp3"
    },
    {
        name: "Dom The Ninja",
        src: "https://www.chosic.com/wp-content/uploads/2022/03/Ghostrifter-Official-Distant.mp3"
    },
    {
        name: "Sensei Dom",
        src: "https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-field-of-fireflies.mp3"
    }
  ];

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (
          <Draggable>
            <div className="Music">
              <AudioPlayer
                autoPlay
                  style={{ height:105, width:400, backgroundColor: 'lightgray', borderRadius: 20, overflow: 'hidden'}}
                src={musicTracks[trackIndex].src}
                onPlay={(e) => console.log("onPlay")}
                showSkipControls={true}
                showJumpControls={false}
                header={`Currenty Playing: ${musicTracks[trackIndex].name}`}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                onEnded={handleClickNext}
              />
            </div>
          </Draggable>
  );
}




