import React from "react";
import bottomWave from "../image_content/bottomWave.svg";
import midWave from "../image_content/midWave.svg";
import secondWave from "../image_content/secondWave.svg";
import topWave from "../image_content/topWave.svg";
import "./check-in.css";

export const CheckIn = () => {
  return (
    <>
    <div style={{marginLeft: "35%", display: "grid"}}>
        {/* <h1>Hey Doge, how was your day?</h1>
        <h3>November 9, 2022</h3> */}
        <Questions />
        <Calendar />
        <Previous />
    </div>
    </>
  );
};


const Questions = () => {
  return (
  <div className = "questions">

  </div>
  );
};

const Calendar = () => {
  return (
    <div className = "calendar">

    </div>
  );
};

const Previous = () => {
  return (
    <div className = "previous">

    </div>
  );
};
