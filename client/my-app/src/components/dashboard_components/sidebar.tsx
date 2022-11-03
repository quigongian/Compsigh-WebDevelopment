import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import homeIcon from "../../image_content/homeIcon.png";
import toDoIcon from "../../image_content/toDoIcon.png";
import watchIcon from "../../image_content/watchIcon.png";
import checkInIcon from "../../image_content/checkInIcon.png";
import "./sidebar.css";
import { useState } from "react";
import { CheckIn } from "../dashboard_components/check-in";
import { Todo } from "../dashboard_components/to-do";
import { Landing } from "../dashboard_components/landing";
import { Timer } from "../dashboard_components/timer";

export default function Sidebar() {
  const [state, setState] = useState("landing");

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#81B29A",
          },
        }}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 140,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          style={{
            width: 140,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img onClick={() => setState("landing")} className="home" src={homeIcon} alt="home icon" />
          <img onClick={() => setState("todo")} className="toDo" src={toDoIcon} alt="to-do list icon" />
          <img onClick={() => setState("timer")} className="watch" src={watchIcon} alt="watch icon" />
          <img onClick={() => setState("checkin")} className="checkIn" src={checkInIcon} alt="check-in icon" />
        </Box>
      </Drawer>
      <div className="sidebarContent">
        {state === "landing" && <Landing />}
        {state === "todo" && <Todo />}
        {state === "timer" && <Timer />}
        {state === "checkin" && <CheckIn />}
      </div>
    </Box>
  );
}
