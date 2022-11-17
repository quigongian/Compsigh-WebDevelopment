import React, { useEffect, useState } from "react";
import bottomWave from "../image_content/bottomWave.svg";
import midWave from "../image_content/midWave.svg";
import secondWave from "../image_content/secondWave.svg";
import topWave from "../image_content/topWave.svg";
import { BiChevronDown } from "react-icons/bi";
import "./check-in.css";

export const CheckIn = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();

  return (
    <>
      <div className="checkin-container">
        <div className="checkin-header" style={{ marginBottom: "0" }}>
          {/* Doge -> Users Name */}
          <h2 style={{ marginLeft: "20%", color: "#FFFFFF", lineHeight: "0%", marginTop: "3%", fontSize: "45px", fontWeight: "600" }}>
            Hey [name], how was your day?
          </h2>
          <p style={{ marginLeft: "20%", fontWeight: "lighter", color: "#FFFFFF", lineHeight: "35px", fontSize: "25px" }}>
            {month} {day}, {year}
          </p>
        </div>
        <Questions />
        <Calendar />
        <Previous />
      </div>
    </>
  );
};

const Questions = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <div className="questions-container">
      <div className="questions">
        <p style={{ marginBottom: "0" }}>How productive would you say you were today?</p>
        <div className="drop-down" onClick={(e) => setOpen1(!open1)}>
          <BiChevronDown style={{ cursor: "pointer", color: "#908484" }} />
        </div>
        {open1 && (
          <div className="drop-down-content">
            <div className="drop-down-content-item"> Great </div>
            <div className="drop-down-content-item"> Alright </div>
            <div className="drop-down-content-item"> Terrible </div>
          </div>
        )}
        <p style={{ marginBottom: "0" }}>Have you completed all your tasks?</p>
        <div className="drop-down" onClick={(e) => setOpen2(!open2)}>
          <BiChevronDown style={{ cursor: "pointer", color: "#908484" }} />
        </div>
        {open2 && (
          <div className="drop-down-content">
            <div className="drop-down-content-item"> Yes </div>
            <div className="drop-down-content-item"> Somewhat </div>
            <div className="drop-down-content-item"> No, not at all </div>
          </div>
        )}
        <p style={{ marginBottom: "0" }}>Are you making any progress towards your goals?</p>
        <div className="drop-down" onClick={(e) => setOpen3(!open3)}>
          <BiChevronDown style={{ cursor: "pointer", color: "#908484" }} />
        </div>
        {open3 && (
          <div className="drop-down-content">
            <div className="drop-down-content-item"> Yes, today I have </div>
            <div className="drop-down-content-item"> No, I have not been making progress </div>
          </div>
        )}
        <p style={{ marginBottom: "0" }}>Do you foresee any problems in progress?</p>
        <div className="drop-down" onClick={(e) => setOpen4(!open4)}>
          <BiChevronDown style={{ cursor: "pointer", color: "#908484" }} />
        </div>
        {open4 && (
          <div className="drop-down-content">
            <div className="drop-down-content-item"> Definitely </div>
            <div className="drop-down-content-item"> Possibly </div>
            <div className="drop-down-content-item"> No </div>
          </div>
        )}
        <p style={{ marginBottom: "0" }}>If so, what are those problems?</p>
      </div>
      <div className="button-container" /* onClick={submit}*/>
        <button className="button"> Submit </button>
      </div>
    </div>
  );
};

const Calendar = () => {
  return <div className="calendar"></div>;
};

const Previous = () => {
  return <div className="previous"></div>;
};
