import { width } from "@mui/system";
import React, { useEffect } from "react";
import { createContext } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import { ComponentTests } from "../../pages/tests/ComponentTests";
import "./Settings.css";
import { Avatar, Button } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  Typography,
  Stack,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Box,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { HttpStatusCode } from "axios";
import { getUser } from "../../services/requests";
import { User } from "../../services/models";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e07a5f",
    },
  },
});
/*|---------------------------------------------------------------------------------Contents Component---------------------------------------------------------------------------------|*/
const Profile = (props:{user:User}) => {
  return (
    <>
      <h3 id="content-title">Profile</h3>
      <div id="user-profile">
        <div className="pimage-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s"
            id="user-image"
            alt="Avatar"
          ></img>
        </div>
        <div className="pinfo-container">
          <ul>
            <li>
              <h4>{props.user.firstName + " " + props.user.lastName}</h4>
            </li>
            <li>
              <h4>{props.user.email}</h4>
            </li>
            <li>
              <h4>{props.user.categoryName}</h4>
            </li>
            <li>
              <h4>{props.user.xpLevelName}</h4>
            </li>
          </ul>
        </div>
      </div>
      <div className="SPACER"></div>
      <hr className="Hr" />
      <div className="pedit-container">
        <ProfileEdit user={props.user}/>
      </div>
      <hr className="Hr" />
      <div className="notification-container">
        <h3>Notifications</h3>
        <div className="n-email">
          <h4>Email</h4>
          <SwitchEmail />
        </div>
        <div className="n-push">
          <h4>Push</h4>
          <SwitchNotifaction />
        </div>
      </div>
    </>
  );
};

const CareerPathSelect = () => {
  const [careerPath, setCareerPath] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareerPath(event.target.value as string);
  };
  return (
    <>
      <Box sx={{ maxWidth: "md" }}></Box>
      <TextField
        label="Career Path"
        select
        value={careerPath}
        onChange={handleChange}
        helperText="Please select your career path"
      >
        <MenuItem value="Data Engineer">Data Engineer</MenuItem>
        <MenuItem value="Data Scientist">Data Scientist</MenuItem>
        <MenuItem value="Data Analyst">Data Analyst</MenuItem>
        <MenuItem value="Data Architect">Data Architect</MenuItem>
        <MenuItem value="Software Manager">Data Manager</MenuItem>
      </TextField>
    </>
  );
};

const ExperienceLevelSelect = () => {
  const [careerPath, setCareerPath] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareerPath(event.target.value as string);
  };
  return (
    <>
      <Box>
        <TextField
          label="Experience Level"
          select
          value={careerPath}
          onChange={handleChange}
          helperText="Please select your experience level"
        >
          <MenuItem value="Data Engineer">Noob</MenuItem>
          <MenuItem value="Data Scientist">Just out of Noob</MenuItem>
          <MenuItem value="Data Analyst">Regular</MenuItem>
          <MenuItem value="Data Architect">Pro</MenuItem>
          <MenuItem value="Software Manager">Leetcode God</MenuItem>
        </TextField>
      </Box>
    </>
  );
};

const ProfileEdit = (props:{user:User}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    if (!email || !email.includes("@")) {
      // Fix this in the future/shouldnt allow email to submit without @
      setEmailError(true);
    } else {
      console.log(email);
    }
  };
  return (
    <>
      <Accordion elevation={0} sx={{ bgcolor: "#81B29A" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Edit Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="pedit-avatar">
            <div className="pedit-avatar-left">
              <Avatar
                alt="Cat"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s"
                sx={{ width: 160, height: 160 }}
              />
            </div>
            <div className="pedit-avatar-right"></div>
          </div>
          <Typography
            variant="h5"
            component="h2"
            color="white"
            fontWeight={"bold"}
          >
            Upload an Avatar
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="white" mt={2}>
            Photo should be no more than 300x300px
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="white">
            Select a premade avatar below instead!
          </Typography>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Cat"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s"
              sx={{ width: 40, height: 40 }}
            />
            <Avatar
              alt="Cat"
              src="https://i.ebayimg.com/images/g/BV4AAOSwkDFf4vAU/s-l500.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <Avatar
              alt="Cat"
              src="https://i.ytimg.com/vi/KmuLmvbdVZA/maxresdefault.jpg"
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
          <Box
            className="pedit-bottom"
            component="form"
            noValidate
            autoComplete="off"
            pt={10}
            pl={20}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={props.user.firstName + " " + props.user.lastName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 4.5 }}
            ></TextField>
            <div className="pedit-name/email">
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                id="outlined-basic"
                label="Email"
                defaultValue={props.user.email}
                helperText="Please enter a valid email"
                variant="outlined"
                required
              />
            </div>
            <Typography sx={{ mb: 1.5 }} color="white" mt={4}>
              <CareerPathSelect />
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white" mt={4}>
              <ExperienceLevelSelect />
            </Typography>
            <Button className="Button" type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export function SwitchEmail() {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
  );
}

export function SwitchNotifaction() {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
  );
}

const Security = () => {
  const [passOpen, setPassOpen] = React.useState(false);

  const [delOpen, setDelOpen] = React.useState(false);

  const passwordOpen = () => {
    setPassOpen(true);
  };

  const passwordClose = () => {
    setPassOpen(false);
  };

  const deleteOpen = () => {
    setDelOpen(true);
  };

  const deleteClose = () => {
    setDelOpen(false);
  };

  return (
    <>
      <h3 id="content-title">Security</h3>
      <h4>Password</h4>
      <button className="Button" onClick={passwordOpen}>
        Change
      </button>
      <Dialog open={passOpen} onClose={passwordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your old password followed by
            your new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={passwordClose}>Cancel</Button>
          <Button onClick={passwordClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <hr className="Hr" />
      <h4>2 Factor Authentication</h4>
      <button className="Button">Enable</button>
      <hr className="Hr" />
      <h4>Delete Account</h4>
      <button className="Button" onClick={deleteOpen}>
        Delete
      </button>
      <Dialog open={delOpen} onClose={deleteClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete your account, please enter your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter email"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteClose}>Cancel</Button>
          <Button onClick={deleteClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Appearance = () => {
  return (
    <>
      <h1>Appearance</h1>
      <p>Display Mode</p>
      <div className="ButtonGroup">
        <button className="LightButton">
          <strong>comsigh light</strong>
        </button>
        <button className="DarkButton">
          <strong>comsigh dark</strong>
        </button>
      </div>
      <p>Accessibility</p>
    </>
  );
};

const Sidebar = () => {
  return <></>;
};

/*|--------------------------------------------------------------------------------Settings Page Render--------------------------------------------------------------------------------|*/
export const SettingsPage = () => {
  const [state, setState] = React.useState("Profile"); //default state is profile
  const [user, setUser] = React.useState<User>({}as User);
  const [Open, setOpen] = React.useState(false);

  useEffect(() => {
    getUser()
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setUser(response.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="Settings">
        <div className="Sidebar">
          <h3 id="sidebar-title">Settings</h3>
          <div className="Sidebar-List">
            <div className="Sidebar-Item">
              <nav>
                <ul>
                  <li>
                    <button onClick={() => setState("Profile")}>Profile</button>
                  </li>
                  <li>
                    <button onClick={() => setState("Security")}>
                      Security
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setState("Appearance")}>
                      Appearance
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="Content">
          {state === "Profile" && <Profile user={user} />}
          {state === "Security" && <Security />}
          {state === "Appearance" && <Appearance />}
        </div>
      </div>
      <Footer />
    </>
  );
};
