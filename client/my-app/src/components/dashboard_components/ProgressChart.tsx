import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const TOTALTASKSDONE = 13;
const TOTALTASKS = 48;
const PERCENT = (TOTALTASKSDONE / TOTALTASKS) * 100;

const data = [
  { name: "Done", value: TOTALTASKSDONE },
  { name: "Total", value: TOTALTASKS },
];

const COLORS = ["#3E4059", "#E07A5F"];

const ProgressChart = () => {
  return (
    <div
      style={{
        height: 196,
        width: 337,
        marginLeft: "40px",
        backgroundColor: "#8BB19C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "23px",
        position: "relative",
      }}
    >
      <h3 style={{ position: "absolute", top: -3, left: 30, color: "#F4F1DE" }}>Total Progress</h3>
      <p style={{ position: "absolute", top: 0, right: 20, color: "#F4F1DE" }}>{`${TOTALTASKSDONE} of ${TOTALTASKS}`}</p>
      <h3 style={{ position: "absolute", color: "#F4F1DE", marginTop: "30px" }}>{`${PERCENT.toFixed(1)}%`}</h3>
      <PieChart width={180} height={180} style={{ marginTop: "7px" }}>
        <Pie data={data} cx={85} cy={90} innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={0} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ProgressChart;
