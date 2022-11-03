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
            <h1 className="header"> About Us</h1>
            <p className="mainpg">
              {clickedButton !== "" ? `` : "We are a team of undergrad computer science students that want to help future and current students of the same major to better manage their time."}
              {clickedButton === "btn1" ? `We are a team of undergrad computer science students that want to help future and current students of the same major to better manage their time.` : ""}
              {clickedButton === "btn2" ? `blah ` : ""}
              {clickedButton === "btn3" ? `blah bleh` : ""}
              {clickedButton === "btn4" ? `blah bloo` : ""}
            </p>

            <div className="btn-group">
              <button onClick={buttonHandler} className="button" name="btn1"></button>
              <button onClick={buttonHandler} className="button" name="btn2"></button>
              <button onClick={buttonHandler} className="button" name="btn3"></button>
              <button onClick={buttonHandler} className="button" name="btn4"></button>
            </div>
            <button className="main-btn">Get Started</button>


          </div>

          <div className="Sect2">
            <h2>One less thing to worry about</h2>
            <div className="row">

              <p className="column">
                <img src={women} alt="woman thinking" />
                <br />
                Breaking down complex tasks <br />into smaller ones by using Pomodoro
              </p>

              <p className="column">
                <img src={idea_search} alt="ladder up the books" height={"203px"} width={"219px"} />
                <br />
                Guiding you through your goals <br />so that you can have peace of mind
              </p>

              <p className="column">
                <img src={clock_calender} alt="clock and calender" />
                <br />
                All your goals put into one <br /> productive website
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
