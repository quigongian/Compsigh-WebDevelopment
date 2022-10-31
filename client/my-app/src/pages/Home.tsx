import React, { useState } from "react";
import { Header } from "../components/header";
import "./home.css";

export const Home = () => {
  const [clickedButton, setClickedButton] = useState("");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };
  return (
    <>
      <Header />
      <div className="All">
        <div className="Sect1">
          <h1>About Us</h1>
          <p>
            {clickedButton !== "" ? `` : "blah blach blach dfusdfi"}
            {clickedButton === "btn1" ? `blah blach blahcahca` : ""}
            {clickedButton === "btn2" ? `blah ` : ""}
            {clickedButton === "btn3" ? `blah bleh` : ""}
            {clickedButton === "btn4" ? `blah bloo` : ""}
          </p>
          {/* 'CMD + /' = comments
        <div className="Imgs">
        <img className="top wave" src={topWave} alt="" width={"100%"} />
        </div>
*/}
          <button className="main-btn">Get Started</button>
          <div className="btn-group">
            <button onClick={buttonHandler} className="button" name="btn1"></button>
            <button onClick={buttonHandler} className="button" name="btn2"></button>
            <button onClick={buttonHandler} className="button" name="btn3"></button>
            <button onClick={buttonHandler} className="button" name="btn4"></button>
          </div>
        </div>

        <div className="Sect2">
          <h2>One less thing to worry about</h2>
        </div>
      </div>
    </>
  );
};
