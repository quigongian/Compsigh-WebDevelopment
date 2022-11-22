import React, { useEffect, useState } from "react";
import './timer.css'
// import popsrc from './timer_components/button-sound.mp3'
import blob2 from './../../image_content/dashBlob2.svg';
import blob1 from './../../image_content/dashBlob1.svg';
import playbtn from './../../image_content/playButton.svg';
import pausebtn from './../../image_content/pauseButton.svg';
import resetbtn from './../../image_content/resetButton.svg';


export const Timer = () => {

  const popsrc = require("./../../sound_content/button-sound.mp3");

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const pop = new Audio(popsrc);

  useEffect(() => {
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
        </main>
      </body>
    </>
  );
};

{/* <div className="dropdown">
            <span><b>Select</b></span>
            <div className="dropdown-content">
            <p>Bells</p>
            <p>Birds</p>
            <p>Melody</p>
           </div> */}