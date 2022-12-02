import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarDashboard.css";

const mark = [
  { date: "12-02-2022", values: "#499570" },
  { date: "12-04-2022", values: "#499570" },
  { date: "12-06-2022", values: "#D1A710" },
  { date: "12-10-2022", values: "#D1A710" },
  { date: "12-11-2022", values: "#DA5D3C" },
  { date: "12-12-2022", values: "#499570" },
];

const CalendarDashboard = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
};

export default CalendarDashboard;

// const CalendarTracker = () => {

//   setDate = (date: { getDay: () => number; getMonth: () => number; getDate: () => number; }) => {
//   const dateobj =
//     mark.find((x) => {
//       return (
//         date.getDay() === new Date(x.date).getDay() &&
//         date.getMonth() === new Date(x.date).getMonth() &&
//         date.getDate() === new Date(x.date).getDate()
//       );
//     });
//     return dateobj ? dateobj.values : "";
//   };

//   const [date, setDate] = useState(new Date());

//   return (
//     <Calendar onChange={setDate} value={date}
//       tileClassName={({ date, view }) => this.setDate(mark)} />
//   );
// }

// export default CalendarTracker;
