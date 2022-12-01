import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";
import quotesJSON from "./quotes.json";
import Heatmap from "./Heatmap";
import ActivityChart from "./ActivityChart";
import ProgressChart from "./ProgressChart";
import CalendarDashboard from "./CalendarDashboard";

export const Landing = () => {
  //data fetch
  //use state hook that contains all the data
  //pass the state variable as props to the nested components
  //
  return (
    <div>
      <Quotes />
      {/* We would be passing something like tasks = {tasks.dates} */}
      <Heatmap />
      <div className="charts" style={{ display: "flex" }}>
        <ActivityChart />
        <ProgressChart />
        <CalendarDashboard />
      </div>
    </div>
  );
};

export const Quotes = () => {
  const num = Math.floor(Math.random() * quotesJSON.quotes.length);
  return (
    <>
      <img className="quotationMarks" src={quotationMarks} alt="quotationMarks" />
      <img className="quotesBG" src={quotesBG} alt="quotationMarks" />
      <div className="rndQuotes">{quotesJSON.quotes[num].quote}</div>
      <div className="creditsContainer">
        <div className="quotesCredits">- {quotesJSON.quotes[num].author}</div>
      </div>
    </>
  );
};
