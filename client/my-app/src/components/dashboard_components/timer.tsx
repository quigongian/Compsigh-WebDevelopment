import React, { useEffect, useState } from "react";
import './timer.css'
// import popsrc from './timer_components/button-sound.mp3'
import blob2 from './../../image_content/dashBlob2.svg';
import blob1 from './../../image_content/dashBlob1.svg';
import playbtn from './../../image_content/playButton.svg';
import pausebtn from './../../image_content/pauseButton.svg';
import resetbtn from './../../image_content/resetButton.svg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';


export const Timer = () => {


  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const popsrc = require("./../../sound_content/button-sound.mp3");
  const melodySrc = require("./../../sound_content/melody.wav")
  const bellSrc = require("./../../sound_content/bell.wav")
  const birdsSrc = require("./../../sound_content/birds.wav")

  const melody = new Audio(melodySrc)
  const bell = new Audio(bellSrc)
  const birds = new Audio(birdsSrc)

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [ring, setRing] = useState("Bell");


  const pop = new Audio(popsrc);
  const sound = new Audio(melodySrc);

  const clickMelody = () => {
    setRing("Melody");
    melody.play();
  };
  const clickBell = () => {
    setRing("Bell");
    bell.play();
  };
  const clickBirds = () => {
    setRing("Birds");
    birds.play();
  };

  useEffect(() => {
    if (time ==0){
      if (ring == "Bell"){
        bell.play();
      }else if (ring=="Melody"){
        melody.play();
      }else{
        birds.play();
      }
    }
    if (isActive && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, isActive]);

  const toggleClock = () => {
    setIsActive(!isActive);
    pop.play();
  };

  const getTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }

  const pomodoroClick = () => {
    setTime(1500);
    setMode("pomodoro");
    if (isActive) {
      setIsActive(!isActive);
    }
  }

  const shortClick = () => {
    setTime(300);
    setMode("short");
    if (isActive) {
      setIsActive(!isActive);
    }
  }

  const longClick = () => {
    setTime(900);
    setMode("long");
    if (isActive) {
      setIsActive(!isActive);
    }
  }

  const resetClock = () => {
    if (mode == "pomodoro") {
      pomodoroClick();
    } else if (mode == "short") {
      shortClick();
    } else {
      longClick();
    }
  }

  return (
    <>
      <body>
        <main className="app">

          <div className="dashBlob2">
            <img src={blob2} />
          </div>

          <div className="dashBlob1">
            <img src={blob1} />
          </div>

          <div className="timer">
            <div className="button-group mode-buttons" >
              <button
                className={mode == "pomodoro" ? 'mode-button-active' : "mode-button"}
                onClick={pomodoroClick}
              >
                Pomodoro
              </button>
              <button
                className={mode == "short" ? 'mode-button-active' : "mode-button"}
                onClick={shortClick}
              >
                Short break
              </button>
              <button
                className={mode == "long" ? 'mode-button-active' : "mode-button"}
                onClick={longClick}
              >
                Long break
              </button>
            </div>
            <div className="clock">
              <div>{getTime()}</div>
            </div>

            <button className="play-button" onClick={toggleClock} >
              {isActive ? <img src={playbtn} /> : <img src={pausebtn} />}
            </button>

            <button className="reset-button" onClick={resetClock}>
              <img src={resetbtn} />
            </button>
          </div>
          <div className="rectangle">

{/* Alarm Sound
            <label htmlFor="Sound">Alarm Sound:</label>
            <br>
            </br>

            <select className="Sounds" onChange={setRinger(this.value)}>
              <option value="bell">Bell</option>
              <option value="birds">Birds</option>
              <option value="melody">Medlody</option>
            </select> */}
            Timer Sound:
            <div className="dropdown-box">
                <div className="dropdown">
                  <span ><strong>{ring} </strong></span>
                  <div className="dropdown-content">
                    <button onClick={clickBell}><b>Bells</b></button>
                    <button onClick={clickBirds}><b>Birds</b></button>
                    <button onClick={clickMelody}><b>Melody</b></button>
                  </div>
                </div>
              </div>

              
            <div className="slider">
            
              <Box sx={{ width: 300, color: 'white' }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <VolumeDown />
                  <Slider sx={{ color: '#81B29A' }} aria-label="Volume" value={value} onChange={handleChange} />
                  <VolumeUp />
                </Stack>
              </Box>
            </div>
          </div>
        </main>
      </body>
    </>
  );
};
