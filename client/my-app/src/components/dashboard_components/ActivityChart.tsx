import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import blueLegend from "../../image_content/blueLegend.png";
import beigeLegend from "../../image_content/beigeLegend.png";
import orangeLegend from "../../image_content/orangeLegend.png";

const data = [
  { name: "Good", value: 40 },
  { name: "Neutral", value: 20 },
  { name: "Bad", value: 10 },
];

const TOTALCHECKINS = data[0].value + data[1].value + data[2].value;

const COLORS = ["#3E4059", "#F4F1DE", "#E07A5F"];

const ActivityChart = () => {
  return (
    <div
      style={{
        height: 196,
        width: 413,
        marginLeft: "185px",
        backgroundColor: "#8BB19C",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: "23px",
        position: "relative",
      }}
    >
      <h3 style={{ position: "absolute", top: -3, left: 30, color: "#F4F1DE" }}>Activity</h3>
      <div className="legend">
        <div
          className="legend-item"
          style={{
            width: "180px",
            marginLeft: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={blueLegend} alt="good legend" style={{ marginRight: "8px", marginTop: "20px" }} />
          <h4 style={{ width: "180px", color: "#F4F1DE", marginTop: "40px" }}>{`${Math.round((data[0].value / TOTALCHECKINS) * 100)}% Good`}</h4>
        </div>
        <div className="legend-item" style={{ width: "180px", marginLeft: "20px", display: "flex", alignItems: "center" }}>
          <img src={beigeLegend} alt="neutral legend" style={{ marginRight: "8px", marginTop: "-14px" }} />
          <h4 style={{ width: "180px", color: "#F4F1DE", marginTop: "5px" }}>{`${Math.round((data[1].value / TOTALCHECKINS) * 100)}% Neutral`}</h4>
        </div>
        <div className="legend-item" style={{ width: "180px", marginLeft: "20px", display: "flex", alignItems: "center" }}>
          <img src={orangeLegend} alt="bad legend" style={{ marginRight: "8px", marginTop: "-15px" }} />
          <h4 style={{ width: "180px", color: "#F4F1DE", marginTop: "5px" }}>{`${Math.round((data[2].value / TOTALCHECKINS) * 100)}% Bad`}</h4>
        </div>
      </div>
      <PieChart width={180} height={170}>
        <Pie data={data} cx={85} cy={80} innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={10} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ActivityChart;
