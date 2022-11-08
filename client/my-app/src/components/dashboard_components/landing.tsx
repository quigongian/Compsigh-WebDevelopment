import React from "react";
import quotesWaves from "../../image_content/quotesWaves.svg";
import "./landing.css";

export const Landing = () => {
  return (
    <div style={{ marginLeft: "25%" }}>
      <Quotes />
    </div>
  );
};

const Quotes = () => {
  return (
    <div className="quotes">
      <div className="bigQuotentionMarks">{"HELLOOOOOOOO"}</div>
      <div className="rndQuotes"></div>
      <img className="quotesWaves" src={quotesWaves} alt="quotesBGx" />
    </div>
  );
};
