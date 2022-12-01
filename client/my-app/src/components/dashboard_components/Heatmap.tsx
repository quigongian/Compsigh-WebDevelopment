import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";
import ReactTooltip from "react-tooltip";

const Heatmap = (props: any) => {
  return (
    <>
      <div className="heatmapTitleDiv">
        <h5 className="heatmapTitle">Task HeatMap</h5>
      </div>
      <ReactTooltip />
      <CalendarHeatmap
        startDate={new Date("2021-12-31")}
        endDate={new Date(Date.now())}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        values={[
          //props.tasks
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

      <div style={{ display: "flex", width: "100px", height: "30px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "yellow",
            width: "270px",
            height: "25px",
            marginLeft: "49rem",
            justifyContent: "space-evenly",
            marginTop: "-40px",
          }}
        >
          <div style={{ color: "#f4f1de", fontWeight: "400", fontSize: "14px" }}>Less</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5px",
              width: "80px",
              height: "15px",
            }}
          >
            <div id="scale" className="scale1"></div>
            <div id="scale" className="scale2"></div>
            <div id="scale" className="scale3"></div>
            <div id="scale" className="scale4"></div>
          </div>
          <div style={{ color: "#f4f1de", fontWeight: "400", fontSize: "14px" }}>More</div>
        </div>
      </div>
    </>
  );
};

export default Heatmap;
