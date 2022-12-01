import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";
import quotesJSON from "./quotes.json";
import Heatmap from "./Heatmap";
import ActivityChart from "./ActivityChart";
import ProgressChart from "./ProgressChart";
import { useEffect, useState } from "react";
import axios from "axios";

export const Landing = () => {
  //data fetch
  //use state hook that contains all the data
  //pass the state variable as props to the nested components
  //

  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const getData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/v1/task", config);
      setTasks(data);
    };
    getData();
  }, []);

  return (
    <div>
      <Quotes />
      {/* We would be passing something like tasks = {tasks.dates} */}
      <Heatmap tasks={tasks} />
      <div className="charts" style={{ display: "flex" }}>
        <ActivityChart />
        <ProgressChart />
      </div>
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
    </div>
  );
};
