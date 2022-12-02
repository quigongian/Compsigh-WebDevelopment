import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";
import ReactTooltip from "react-tooltip";

const Heatmap = (props: any) => {
  const FAKEPRESENTATIONDATA = [
    { date: "2022-01-01", count: 1 },
    { date: "2022-01-03", count: 4 },
    { date: "2022-01-04", count: 2 },
    { date: "2022-01-05", count: 9 },
    { date: "2022-01-06", count: 7 },
    { date: "2022-01-08", count: 2 },
    { date: "2022-01-09", count: 1 },
    { date: "2022-01-10", count: 1 },
    { date: "2022-01-12", count: 4 },
    { date: "2022-01-13", count: 10 },
    { date: "2022-01-14", count: 2 },
    { date: "2022-01-15", count: 3 },
    { date: "2022-01-16", count: 6 },
    { date: "2022-01-17", count: 9 },
    { date: "2022-01-20", count: 2 },
    { date: "2022-01-21", count: 3 },
    { date: "2022-01-22", count: 2 },
    { date: "2022-01-23", count: 2 },
    { date: "2022-01-26", count: 8 },
    { date: "2022-01-27", count: 6 },
    { date: "2022-01-29", count: 4 },
    { date: "2022-01-30", count: 9 },
    { date: "2022-02-01", count: 1 },
    { date: "2022-02-03", count: 4 },
    { date: "2022-02-04", count: 2 },
    { date: "2022-02-05", count: 9 },
    { date: "2022-02-06", count: 7 },
    { date: "2022-02-08", count: 2 },
    { date: "2022-02-09", count: 1 },
    { date: "2022-02-10", count: 9 },
    { date: "2022-02-12", count: 4 },
    { date: "2022-02-13", count: 7 },
    { date: "2022-02-14", count: 2 },
    { date: "2022-02-15", count: 3 },
    { date: "2022-02-16", count: 6 },
    { date: "2022-02-17", count: 9 },
    { date: "2022-02-20", count: 2 },
    { date: "2022-02-21", count: 3 },
    { date: "2022-02-22", count: 2 },
    { date: "2022-02-23", count: 2 },
    { date: "2022-02-24", count: 8 },
    { date: "2022-03-03", count: 4 },
    { date: "2022-03-04", count: 2 },
    { date: "2022-03-05", count: 9 },
    { date: "2022-03-06", count: 7 },
    { date: "2022-03-08", count: 2 },
    { date: "2022-03-10", count: 1 },
    { date: "2022-03-10", count: 1 },
    { date: "2022-03-12", count: 4 },
    { date: "2022-03-13", count: 10 },
    { date: "2022-03-14", count: 2 },
    { date: "2022-03-15", count: 3 },
    { date: "2022-03-16", count: 6 },
    { date: "2022-03-17", count: 9 },
    { date: "2022-03-20", count: 2 },
    { date: "2022-03-21", count: 3 },
    { date: "2022-03-22", count: 2 },
    { date: "2022-03-23", count: 2 },
    { date: "2022-03-26", count: 8 },
    { date: "2022-03-27", count: 6 },
    { date: "2022-03-29", count: 4 },
    { date: "2022-04-01", count: 1 },
    { date: "2022-04-03", count: 4 },
    { date: "2022-04-04", count: 2 },
    { date: "2022-04-05", count: 9 },
    { date: "2022-04-06", count: 7 },
    { date: "2022-04-08", count: 2 },
    { date: "2022-04-09", count: 1 },
    { date: "2022-04-10", count: 1 },
    { date: "2022-04-12", count: 4 },
    { date: "2022-04-13", count: 10 },
    { date: "2022-04-14", count: 2 },
    { date: "2022-04-15", count: 3 },
    { date: "2022-04-16", count: 6 },
    { date: "2022-04-17", count: 9 },
    { date: "2022-04-20", count: 2 },
    { date: "2022-04-21", count: 3 },
    { date: "2022-04-22", count: 2 },
    { date: "2022-04-23", count: 2 },
    { date: "2022-04-26", count: 8 },
    { date: "2022-04-27", count: 6 },
    { date: "2022-04-29", count: 4 },
    { date: "2022-04-30", count: 9 },
    { date: "2022-05-03", count: 9 },
    { date: "2022-05-12", count: 5 },
    { date: "2022-05-21", count: 4 },
    { date: "2022-05-25", count: 2 },
    { date: "2022-06-01", count: 1 },
    { date: "2022-06-03", count: 4 },
    { date: "2022-06-04", count: 2 },
    { date: "2022-06-05", count: 9 },
    { date: "2022-06-06", count: 7 },
    { date: "2022-06-08", count: 2 },
    { date: "2022-06-09", count: 1 },
    { date: "2022-06-10", count: 1 },
    { date: "2022-06-12", count: 4 },
    { date: "2022-06-13", count: 10 },
    { date: "2022-06-14", count: 2 },
    { date: "2022-06-15", count: 3 },
    { date: "2022-06-16", count: 6 },
    { date: "2022-06-17", count: 9 },
    { date: "2022-06-20", count: 2 },
    { date: "2022-06-21", count: 3 },
    { date: "2022-06-22", count: 2 },
    { date: "2022-06-23", count: 2 },
    { date: "2022-06-26", count: 8 },
    { date: "2022-06-27", count: 6 },
    { date: "2022-06-29", count: 4 },
    { date: "2022-06-30", count: 9 },
    { date: "2022-07-01", count: 1 },
    { date: "2022-07-03", count: 4 },
    { date: "2022-07-04", count: 2 },
    { date: "2022-07-05", count: 9 },
    { date: "2022-07-06", count: 7 },
    { date: "2022-07-08", count: 2 },
    { date: "2022-07-09", count: 1 },
    { date: "2022-07-10", count: 9 },
    { date: "2022-07-12", count: 4 },
    { date: "2022-07-13", count: 7 },
    { date: "2022-07-14", count: 2 },
    { date: "2022-07-15", count: 3 },
    { date: "2022-07-16", count: 6 },
    { date: "2022-07-17", count: 9 },
    { date: "2022-07-20", count: 2 },
    { date: "2022-07-21", count: 3 },
    { date: "2022-07-22", count: 2 },
    { date: "2022-07-23", count: 2 },
    { date: "2022-07-26", count: 8 },
    { date: "2022-07-27", count: 6 },
    { date: "2022-07-29", count: 4 },
    { date: "2022-07-31", count: 6 },
    { date: "2022-08-03", count: 4 },
    { date: "2022-08-04", count: 2 },
    { date: "2022-08-05", count: 9 },
    { date: "2022-08-06", count: 7 },
    { date: "2022-08-08", count: 2 },
    { date: "2022-08-10", count: 1 },
    { date: "2022-08-10", count: 1 },
    { date: "2022-08-12", count: 4 },
    { date: "2022-08-13", count: 10 },
    { date: "2022-08-14", count: 2 },
    { date: "2022-08-15", count: 3 },
    { date: "2022-08-16", count: 6 },
    { date: "2022-08-17", count: 9 },
    { date: "2022-08-20", count: 2 },
    { date: "2022-08-21", count: 3 },
    { date: "2022-08-22", count: 2 },
    { date: "2022-08-23", count: 2 },
    { date: "2022-08-26", count: 8 },
    { date: "2022-08-27", count: 6 },
    { date: "2022-08-29", count: 4 },
    { date: "2022-09-01", count: 1 },
    { date: "2022-09-03", count: 4 },
    { date: "2022-09-04", count: 2 },
    { date: "2022-09-05", count: 9 },
    { date: "2022-09-06", count: 7 },
    { date: "2022-09-08", count: 2 },
    { date: "2022-09-09", count: 1 },
    { date: "2022-09-10", count: 1 },
    { date: "2022-09-12", count: 4 },
    { date: "2022-09-13", count: 10 },
    { date: "2022-09-14", count: 2 },
    { date: "2022-09-15", count: 3 },
    { date: "2022-09-16", count: 6 },
    { date: "2022-09-17", count: 9 },
    { date: "2022-09-20", count: 2 },
    { date: "2022-09-21", count: 3 },
    { date: "2022-09-22", count: 2 },
    { date: "2022-09-23", count: 2 },
    { date: "2022-09-26", count: 8 },
    { date: "2022-09-27", count: 6 },
    { date: "2022-09-29", count: 4 },
    { date: "2022-09-30", count: 9 },
    { date: "2022-10-01", count: 1 },
    { date: "2022-10-03", count: 4 },
    { date: "2022-10-04", count: 2 },
    { date: "2022-10-05", count: 9 },
    { date: "2022-10-06", count: 7 },
    { date: "2022-10-08", count: 2 },
    { date: "2022-10-09", count: 1 },
    { date: "2022-10-10", count: 9 },
    { date: "2022-10-12", count: 4 },
    { date: "2022-10-13", count: 10 },
    { date: "2022-10-14", count: 2 },
    { date: "2022-10-15", count: 3 },
    { date: "2022-10-16", count: 6 },
    { date: "2022-10-17", count: 9 },
    { date: "2022-10-20", count: 2 },
    { date: "2022-10-21", count: 3 },
    { date: "2022-10-22", count: 2 },
    { date: "2022-10-23", count: 2 },
    { date: "2022-10-26", count: 8 },
    { date: "2022-10-27", count: 6 },
    { date: "2022-10-29", count: 4 },
    { date: "2022-10-31", count: 6 },
    { date: "2022-11-03", count: 4 },
    { date: "2022-11-04", count: 2 },
    { date: "2022-11-05", count: 9 },
    { date: "2022-11-06", count: 7 },
    { date: "2022-11-08", count: 2 },
    { date: "2022-11-10", count: 1 },
    { date: "2022-11-10", count: 1 },
    { date: "2022-11-12", count: 4 },
    { date: "2022-11-13", count: 10 },
    { date: "2022-11-14", count: 2 },
    { date: "2022-11-15", count: 3 },
    { date: "2022-11-16", count: 6 },
    { date: "2022-11-17", count: 9 },
    { date: "2022-11-20", count: 2 },
    { date: "2022-11-21", count: 3 },
    { date: "2022-11-22", count: 2 },
    { date: "2022-11-23", count: 2 },
    { date: "2022-11-26", count: 8 },
    { date: "2022-11-27", count: 6 },
    { date: "2022-11-29", count: 4 },
  ];
  const countDate: any[] = [];

  // Change to empty [] to work properly without seed data. Using seeded data for demo presentation
  const value: any = FAKEPRESENTATIONDATA;

  const allTasks: any = props.tasks;

  function getOccurrence(array: any[], value: any) {
    return array.filter((v: any) => v === value).length;
  }

  Object.keys(allTasks).map((i: any) => allTasks[i].completed && countDate.push(allTasks[i].completedAt.split("T")[0]));

  Object.keys(allTasks).map(
    (i: any) =>
      allTasks[i].completed &&
      value.push({
        date: allTasks[i].completedAt.split("T")[0],
        count: getOccurrence(countDate, allTasks[i].completedAt.split("T")[0]),
      })
  );

  var oneYearBeforeNow = new Date();
  oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <>
      <div className="heatmapTitleDiv">
        <h4 className="heatmapTitle">Task HeatMap</h4>
      </div>
      <ReactTooltip />
      <CalendarHeatmap
        startDate={oneYearBeforeNow}
        endDate={yesterday}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        values={value}
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
          if (value?.date === null) {
            return {
              "data-tip": "No Tasks Completed",
            };
          }
          return {
            "data-tip": `${value?.date} has count: ${value?.count}`,
          };
        }}
        onClick={(value) => alert(`Clicked on value with count: ${value ? value.count : 0}`)}
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
