import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";
import ReactTooltip from "react-tooltip";

const Heatmap = (props: any) => {
  const value: any = [];

  const allTasks: any = props.tasks;

  Object.keys(allTasks).map((i: any) => value.push({ date: allTasks[i].createdAt.split("T")[0], count: 2 }));

  console.log("value", value);

  var oneYearBeforeNow = new Date();
  oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

  return (
    <>
      <div className="heatmapTitleDiv">
        <h5 className="heatmapTitle">Task HeatMap</h5>
      </div>
      <ReactTooltip />
      <CalendarHeatmap
        startDate={new Date(oneYearBeforeNow)}
        endDate={new Date(Date.now())}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        values={[props.tasks]}
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
