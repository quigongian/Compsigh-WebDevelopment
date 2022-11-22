import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";
import ReactTooltip from "react-tooltip";

const Heatmap = () => {
  return (
    <div className="heatmap">
      <div style={{ marginTop: "40px", marginLeft: "185px", backgroundColor: "#3d405b", width: "790px", borderRadius: "23px 23px 0 0" }}>
        <h5 style={{ marginBottom: 0, color: "#f4f1de", marginLeft: "50px", paddingTop: "20px" }}>Task HeatMap</h5>
      </div>
      <ReactTooltip />
      <CalendarHeatmap
        startDate={new Date("2021-12-31")}
        endDate={new Date(Date.now())}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        values={[
          { date: "2022-01-01", count: 3 },
          { date: "2022-01-02", count: 7 },
          { date: "2022-01-03", count: 9 },
          { date: "2022-01-04", count: 6 },
          { date: "2022-02-20", count: 4 },
          { date: "2022-03-30", count: 12 },
          { date: "2022-04-30", count: 8 },
          { date: "2022-05-30", count: 1 },
          { date: "2022-06-30", count: 10 },
          { date: "2022-07-30", count: 6 },
          { date: "2022-08-30", count: 7 },
          { date: "2022-09-30", count: 9 },
          { date: "2022-10-30", count: 2 },
          { date: "2022-11-30", count: 4 },
          { date: "2022-12-30", count: 6 },
          { date: "2022-10-23", count: 12 },
          { date: "2022-04-16", count: 3 },
          { date: "2022-03-14", count: 5 },
          { date: "2022-09-23", count: 11 },
        ]}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          if (value.count <= 2) {
            return `color-scale-1`;
          } else if (value.count <= 4) {
            return `color-scale-2`;
          } else if (value.count <= 8) {
            return `color-scale-3`;
          } else {
            return `color-scale-4`;
          }
        }}
        tooltipDataAttrs={(value: any) => {
          if (value.date === null) {
            return {
              "data-tip": "No Tasks Completed",
            };
          }
          return {
            "data-tip": `${value.date} has count: ${value.count}`,
          };
        }}
        onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
      />
    </div>
  );
};

export default Heatmap;
