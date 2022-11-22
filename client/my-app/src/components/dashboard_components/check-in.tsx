import React, { useEffect, useState } from "react";
import bottomWave from "../../image_content/bottomWave.svg";
import midWave from "../../image_content/midWave.svg";
import secondWave from "../../image_content/secondWave.svg";
import topWave from "../../image_content/topWave.svg";
import "./check-in.css";
import { Box,
         TextField,
         MenuItem } from "@mui/material";
import { margin } from "@mui/system";



export const CheckIn = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();

  return (
    <>
      <div className="checkin-container">
        <div className="checkin-header" style={{ marginBottom: "0" }}>
          {/* Doge -> Users Name */}
          <h2 style={{ marginLeft: "20%", color: "#FFFFFF", lineHeight: "0%", marginTop: "3%", fontSize: "45px", fontWeight: "600" }}>
            Hey [name], how was your day?
          </h2>
          <p style={{ marginLeft: "20%", fontWeight: "lighter", color: "#FFFFFF", lineHeight: "35px", fontSize: "25px" }}>
            {month} {day}, {year}
          </p>
        </div>
        <Questions />
        <Calendar />
        <Previous />

      <img className="wave one" src={bottomWave} alt="" width={"100%"} />
      <img className="wave two" src={midWave} alt="" width={"100%"} />
      <img className="wave three" src={secondWave} alt="" width={"100%"} />
      <img className="wave four" src={topWave} alt="" width={"100%"} />
      </div>
    </>
  );
};
// ---------------------------------------------- Questions Container ----------------------------------------------
const Questions = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
    <div className="questions-container">
      <div className = "questions">
        <Question1 />
        <Question2 />
        <Question3 />
        <Question4 />
        <Question5 />
        <div className="button-container">
          <button className="button"> Submit </button>
        </div>
      </div>
    </div>
    </>
  );
};

const Question1 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
    {/* <Box className = "questions1"> */}
      <p style={{ marginBottom: "0" }}>How productive would you say you were today?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 30 }
          }}
          id = "standard_basic" 
          select
          value={open}
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          >
          <MenuItem value="Great">Great</MenuItem>
          <MenuItem value="Alright">Alright</MenuItem>
          <MenuItem value="Terrible">Terrible</MenuItem>
        </TextField>
      {/* </Box> */}
    </>
  );
};

const Question2 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
    {/* <Box className = "questions2"> */}
    <p style={{marginBottom: "0"}}>Have you completed all your tasks?</p>
      <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 30 }
          }}
          id = "standard_basic" 
          select
          value={open}
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className="textfield"
          >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="Somewhat">Somewhat</MenuItem>
          <MenuItem value="No">No, not at all</MenuItem>
        </TextField>
      {/* </Box> */}
    </>
  );
};

const Question3 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
    {/* <Box className = "questions3"> */}
    <p style={{marginBottom: "0"}}>Are you making any progress towards your goals?</p>
      <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 30 }
          }}
          id = "standard_basic" 
          select
          value={open}
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className="textfield"
          >
          <MenuItem value="Yes">Yes, today I have</MenuItem>
          <MenuItem value="No">No, I have not been making progress</MenuItem>
        </TextField>
      {/* </Box> */}
    </>
  );
};

const Question4 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
    {/* <Box className = "questions4"> */}
    <p style={{marginBottom: "0"}}>Do you foresee any problems in progress?</p>
      <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 30 }
          }}
          id = "standard_basic" 
          select
          value={open}
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className="textfield"
          >
          <MenuItem value="Yes">Definitely</MenuItem>
          <MenuItem value="No">Possibly</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
      {/* </Box> */}
    </>
  );
};

const Question5 = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
  };
  return (
    <>
    {/* <Box className = "questions4"> */}
    <p style={{marginBottom: "0"}}>If so, what are those problems?</p>
      <TextField
          id="outlined-multiline-static"
          multiline
          rows={3.20}
          inputProps={{ maxLength: 250 }}
          className="textfield"
        />
      {/* </Box> */}
    </>
  );
};

// ---------------------------------------------- Calendar Container ----------------------------------------------
const Calendar = () => {
  return <div className="calendar"></div>;
};

// ---------------------------------------------- Previous Container ----------------------------------------------
const Previous = () => {
  return(
    <div className="previous">
      <p style={{ marginLeft: "73%", marginTop: "0%", fontWeight: "lighter", color: "#FFFFFF", lineHeight: "10px", fontSize: "13px" }}>
            November 20, 2022
          </p>
      <Previous1 />
      <Previous2 />
      <Previous3 />
      <Previous4 />
      <Previous5 />
  </div>
  );
};

const Previous1 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
      <p className="previous-questions" style = {{marginBottom: "0"}}>How productive would you say you were today?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 20 }
          }}
          disabled
          id="outlined-disabled"
          defaultValue=" "        //Value from Calendar
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          />
    </>
  );
};

const Previous2 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
      <p className="previous-questions" style = {{marginBottom: "0"}}>Have you completed all your tasks?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 20 }
          }}
          disabled
          id="outlined-disabled"
          defaultValue=" "        //Value from Calendar
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          />
    </>
  );
};

const Previous3 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
      <p className="previous-questions" style = {{marginBottom: "0"}}>Are you making any progress towards your goals?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 20 }
          }}
          disabled
          id="outlined-disabled"
          defaultValue=" "        //Value from Calendar
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          />
    </>
  );
};

const Previous4 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
      <p className="previous-questions" style = {{marginBottom: "0"}}>Do you forsee any problems in progress?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 20 }
          }}
          disabled
          id="outlined-disabled"
          defaultValue=" "        //Value from Calendar
          size = "small"
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          />
    </>
  );
};

const Previous5 = () => {
  const [open, setOpen] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.value as string);
  };
  return (
    <>
      <p className="previous-questions" style = {{marginBottom: "0" }}>If so, what are those problems?</p>
        <TextField 
          sx = {{
            "& .MuiInputBase-root": {
              height: 50}
          }}
          id="outlined-multiline-disabled"
          multiline
          rows={4}
          InputLabelProps={{shrink: false}}
          onChange = {handleChange}
          className = "textfield"
          />
    </>
  );
};
