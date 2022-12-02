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
import { Quotes } from "../dashboard_components/landing";

export default function Sidebar() {
  const [state, setState] = useState("landing");

  return (
    <>
      <div style={{ position: "fixed", zIndex: "1", overflowX: "hidden" }}>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#81B29A",
              height: "100vh",
              // marginTop: "49px",
              // position: "fixed",
              // top: "0",
              // position: "fixed",
              // zIndex: "1",
              // overflowX: "hidden",
            },
          }}
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 140,
              boxSizing: "border-box",
              position: "fixed",
              top: "0",
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
              marginTop: "3rem",
            }}
          >
            <img className="home" onClick={() => setState("landing")} src={homeIcon} alt="home icon" />
            <img className="toDo" onClick={() => setState("todo")} src={toDoIcon} alt="to-do list icon" />
            <img className="watch" onClick={() => setState("timer")} src={watchIcon} alt="watch icon" />
            <img className="checkIn" onClick={() => setState("checkin")} src={checkInIcon} alt="check-in icon" />
          </Box>
        </Drawer>
      </div>
      {state === "landing" && <Landing />}
      {state === "todo" && <Todo />}
      {state === "timer" && <Timer />}
      {state === "checkin" && <CheckIn />}
    </>
  );
}
