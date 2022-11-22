import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";
import quotesJSON from "./quotes.json";
import Heatmap from "./Heatmap";
import ActivityChart from "./ActivityChart";
import ProgressChart from "./ProgressChart";

export const Landing = () => {
  return (
    <div>
      <Quotes />
      <Heatmap />
    </div>
  );
};

export const Quotes = () => {
  const num = Math.floor(Math.random() * quotesJSON.quotes.length);
  return (
    <div className="quotes">
      <img className="quotationMarks" src={quotationMarks} alt="quotationMarks" />
      <img className="quotesBG" src={quotesBG} alt="quotationMarks" />
      <div className="rndQuotes">{quotesJSON.quotes[num].quote}</div>
      <div className="creditsContainer">
        <div className="quotesCredits">- {quotesJSON.quotes[num].author}</div>
      </div>
      <Heatmap />
      <div className="charts" style={{ display: "flex" }}>
        <ActivityChart />
        <ProgressChart />
      </div>
    </div>
  );
};
