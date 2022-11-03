import React, { useState } from "react";
import { Header } from "../components/header";
import women from "../image_content/women.svg";
import idea_search from "../image_content/idea_search.svg";
import clock_calender from "../image_content/clock_calender.svg";
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
      <div className="temp">
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
            <div className="row">
              <p className="column">
                <img src={women} alt="woman thinking" />
                <br />
              Breaking down complex tasks into smaller ones by using Pomodoro
              </p>
              <p className="column">
              <img src={idea_search} alt="ladder up the books" />
              <br />
              Guiding you through your goals so that you can have peace of mind
              </p>
              <p className="column">
              <img src={clock_calender} alt="clock and calender" />
                <br />
              All your goals put into one productive website
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
