import React, {useEffect, useState} from "react";
import bottomWave from "../image_content/bottomWave.svg";
import midWave from "../image_content/midWave.svg";
import secondWave from "../image_content/secondWave.svg";
import topWave from "../image_content/topWave.svg";
import {BiChevronDown} from 'react-icons/bi';
import "./check-in.css";

export const CheckIn = () => {
  return (
    <>
    <div className="checkin-container"> 
      <div className="checkin-header" style = {{marginBottom: "0"}}>
                    {/* Doge -> Users Name */}
          <h2 style = {{marginLeft: "12%", color: "#FFFFFF", lineHeight: "0%", marginTop: "3%", fontSize: "50px", fontWeight: "600"}}> Hey Doge, how was your day?</h2>
                    {/*Retrieve current date */}
          <p style={{marginLeft: "12%", fontWeight: "lighter", color: "#FFFFFF", lineHeight: "35px", fontSize: "25px"}}>November 18, 2022</p>
      </div>
      <div className="checkin-grid-container">
          <Questions />
          <Calendar />
          <Previous />
      </div>
    </div>
    </>
  );
};


const Questions = () => {
  const [open, setOpen] = useState(false);
  // const [answer, setAnswer] = useState(null);
  // useEffect(() => {
  //  fetch()
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   }) 
  // }, [])
  return (
  <div className = "questions-container">
    <div className = "questions">
      <p style = {{marginBottom: "0"}}>How productive would you say you were today?</p>
        <div className = "Selector" onClick = {() => setOpen(!open)}>         
          <BiChevronDown style = {{cursor: "pointer", color: "#908484"}}/>
        </div>
      {/* <ul className = "selector-container" style = {{backgroundColor: "#DDDBDB", width: "80%", cursor: "pointer"}}>
        {/* Color depth if hover */}
        {/* <li className = "options">Great</li>
        <li className = "options">Alright</li>
        <li className = "options">Bad</li>
      </ul> */}
      <p style = {{marginBottom: "0"}}>Have you completed all your tasks?</p>
      <div className = "Selector" style = {{}}>
        <BiChevronDown style = {{cursor: "pointer", color: "#908484"}}/>
      </div>
      <p style = {{marginBottom: "0"}}>Are you making any progress?</p>
      <div className = "Selector">
        <BiChevronDown style = {{cursor: "pointer", color: "#908484"}}/>
      </div>
      <p style = {{marginBottom: "0"}}>Do you foresee any problems in progress?</p>
      <div className = "Selector">
        <BiChevronDown style = {{cursor: "pointer", color: "#908484"}}/>
      </div>
      <p style = {{marginBottom: "0"}}>What are those problems?</p>
    </div>
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
