import React from "react";
import './timer.css'
import settingButton from "../../image_content/Settings icon.svg"
import playButton from "../../image_content/Play button.svg"
import replayButton from "../../image_content/Replay.svg"


export const Timer = () => {
  return (
    <>
      <body className="timer-wrapper">

        {/* blob2 */}
        <div className="dashBlob2">
          <svg width="470" height="547" viewBox="0 0 470 547" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M277.209 -164.047C350.932 -176.121 447.419 -108.173 449.848 -31.962C452.806 60.8186 285.08 97.4839 288.503 190.233C292.234 291.347 495.479 321.95 466.513 419.697C441.709 503.4 299.822 402.514 218.203 427.461C156.222 446.406 121.877 568.216 63.4208 542.906C-3.69224 513.847 51.6238 384.094 -0.818292 332.63C-48.3497 285.985 -144.809 339.636 -191.813 292.432C-239.87 244.17 -250.218 163.092 -238.798 93.6366C-226.794 20.6214 -199.017 -79.9263 -128.239 -94.2431C-42.7734 -111.531 8.25279 41.0784 94.0913 26.3C180.59 11.4081 190.618 -149.866 277.209 -164.047Z" fill="#E07A5F" />
          </svg>
        </div>

        {/* blob1 */}
        <div className="dashBlob1">
          <svg width="584" height="595" viewBox="0 0 584 595" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M365.274 44.9272C426.798 -10.2839 561.901 -16.2063 613.856 42.655C677.108 114.314 543.131 247.208 606.799 318.554C676.21 396.335 887.463 294.729 923.903 390.088C955.107 471.746 755.804 479.69 695.238 549.987C649.245 603.371 696.304 721.121 624.786 737.268C542.677 755.806 510.18 618.78 427.277 610.487C352.138 602.971 296.31 705.193 221.302 696.907C144.615 688.436 82.0343 630.622 47.5165 568.537C11.2297 503.27 -28.1555 406.429 29.1344 351.264C98.3131 284.652 245.802 373.937 316.967 309.081C388.679 243.728 293.012 109.775 365.274 44.9272Z" fill="#E07A5F" />
          </svg>
        </div>

        <div className="content">
          <div className="timeOptionBar">
            <button className="pomodoroButton">Pomodoro</button>
            <button className="shortBreakButton">Short Break</button>
            <button className="longBreakButton">Long Break</button>
          </div>

        
          <div className="timerButtons">
            <img className="setting" src={settingButton} alt="setting button" />
            <img className="play" src={playButton} alt="play button" />
            <img className="replay" src={replayButton} alt="replay button" />
          </div>

        </div>
      </body>
    </>
  );
};
