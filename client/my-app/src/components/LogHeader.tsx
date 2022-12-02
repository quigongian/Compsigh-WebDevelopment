import React from "react";
import { Link } from "react-router-dom";
import compSighLogo from "../image_content/compsighLogo_white.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings'

const container = {
  // height: '100%',
  // backgroundColor: '#3D405B',
  // zIndex: '3'
  width: "100%",
  backgroundColor: "#3d405b",
  position: "fixed",
  zIndex: "5",
} as React.CSSProperties;

const wrapper = {
  padding: "7px 15px",
  display: "flex",
  alignItems: "center",
};

//Div for the left side of the navbar
const Left = {
  height: "30px",
  flex: "0.5",
  display: "flex",
  alignItems: "center",
  // backgroundColor: 'blue'
};

//Div for the center of the navbar
const Center = {
  height: "25px",
  flex: "1.5",
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
};

//Div for the right side of the navbar
const Right = {
  borderRadius: "12px",
  height: "35px",
  // flex:'0.95',
  display: "flex",
  backgroundColor: "#2C2E41",
  alignItems: "center",
  justifyContent: "Right",
};

//Setting and About were separated into two because setting needed a 'marginLeft'

const wordAbout = {
  color: "white",
  marginRight: "75px",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
};

const wordOurTeam = {
  color: "white",
  marginRight: "75px",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  marginLeft: "25px",
};

const logoImage = {
  height: "100px",
};

//Login Box
const box1 = {
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "650",
  borderRadius: "12px",
  height: "100%",
  width: "80px",
  backgroundColor: "#81B29A",
  fontSize: "15px",
  border: "none",
  cursor: "pointer",
};

export const LogHeader = () => {
    return (
        <>
        <div style={container}>

        <div style={wrapper}>

        <div style={Left}>
            <Link to = "/"><img style={logoImage} src={compSighLogo}/></Link>
        </div>

        <div style={Center}></div>

        <div style={Right}>
            
            <Link to="/Setting"><SettingsIcon style={{color:"white", marginRight: "50px", marginLeft:"25px"}}/></Link>
            <Link to="/dashboard"><AccountCircleIcon style={{color:"white", marginRight: "25px"}}/></Link>
            {/* <button style={box1}>
                
                <Link to = "/login" style={{ textDecoration: 'none', color: 'white' }}>Log In</Link >
            </button> */}
           
        </div>
        </div>

        </div>
        </>
    );
}
