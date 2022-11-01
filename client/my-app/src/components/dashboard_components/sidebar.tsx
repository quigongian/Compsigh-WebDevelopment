import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import homeIcon from "../../image_content/homeIcon.png";
import toDoIcon from "../../image_content/toDoIcon.png";
import watchIcon from "../../image_content/watchIcon.png";
import checkInIcon from "../../image_content/checkInIcon.png";
import "./sidebar.css";

export default function Sidebar() {
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
          <Link to="/">
            <img className="home" src={homeIcon} alt="home icon" />
          </Link>
          <Link to="/">
            <img className="toDo" src={toDoIcon} alt="to-do list icon" />
          </Link>
          <Link to="/">
            <img className="watch" src={watchIcon} alt="watch icon" />
          </Link>
          <Link to="/">
            <img className="checkIn" src={checkInIcon} alt="check-in icon" />
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
}
