import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";
import quotesJSON from "./quotes.json";
import Heatmap from "./Heatmap";
import ActivityChart from "./ActivityChart";
import ProgressChart from "./ProgressChart";
import { useEffect, useState } from "react";
import CalendarDashboard from "./CalendarDashboard";
import { CheckIn, Task } from "../../services/models";
import {
    getPaginatedCheckIns,
    getTasksByStatus,
} from "../../services/requests";

export const Landing = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

    useEffect(() => {
        const getData = async () => {
            setTasks((await getTasksByStatus()).data);
            setCheckIns((await getPaginatedCheckIns()).data);
        };
        getData();
    }, []);

    return (
        <div>
            <Quotes />
            {/* We would be passing something like tasks = {tasks.dates} */}
            <Heatmap tasks={tasks} />
            <div
                className="charts"
                style={{ display: "flex", marginTop: "-15px" }}
            >
                <ActivityChart checkIns={checkIns} />
                <ProgressChart tasks={tasks} />
                <CalendarDashboard />
            </div>
        </div>
    );
};

export const Quotes = () => {
    const num = Math.floor(Math.random() * quotesJSON.quotes.length);
    return (
        <div className="quotes">
            <img
                className="quotationMarks"
                src={quotationMarks}
                alt="quotationMarks"
            />
            <img className="quotesBG" src={quotesBG} alt="quotationMarks" />
            <div className="rndQuotes">{quotesJSON.quotes[num].quote}</div>
            <div className="creditsContainer">
                <div className="quotesCredits">
                    - {quotesJSON.quotes[num].author}
                </div>
            </div>
        </div>
    );
};
