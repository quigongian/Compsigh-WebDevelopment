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
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { changeTheme, deleteUser, getCategories, getUser, resetPassword, updatePassword } from "../../services/requests";
import { Category, Theme, User } from "../../services/models";
import { HttpStatusCode } from "../../services/http-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        setCategories(response.data);
      } else {
        console.log("Error");
      }
    });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareerPath(event.target.value);
  };
  return (
    <><Box sx={{ minWidth: "md" }}></Box><TextField
      label="Career Path"
      select
      value={careerPath}
      onChange={handleChange}
      helperText="Please select your career path"
    >
      {categories.map((category) => (
        <MenuItem key={category.categoryId} value={category.categoryName}>
          {category.categoryName}
        </MenuItem>
      ))}
    </TextField></>
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
              <IconButton>
                <Avatar
                  alt="Cat"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s"
                  sx={{ width: 160, height: 160 }}
                />
              </IconButton>
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
            <IconButton>
              <Avatar
                alt="Cat"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            <IconButton>
              <Avatar
                alt="Cat"
                src="https://i.ebayimg.com/images/g/BV4AAOSwkDFf4vAU/s-l500.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            <IconButton>
              <Avatar
                alt="Cat"
                src="https://i.ytimg.com/vi/KmuLmvbdVZA/maxresdefault.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
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
              value={props.user.firstName + " " + props.user.lastName} //sadjsjadjiusjuidjasiujdiuasjdiuajsiudjsiuajdiuasjdiuajdiusajdiusjaiudjsaiudjsaiudjasiujdiuas
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
            <TextField
              label="Experience Level"
              variant="outlined"
              defaultValue={"ERROR"}
              value={props.user.xpLevelName} //sdaiudiasiduhhuadhsuhdiusahuidhasuhdiushudhasiuhduisahuidhsaiuhduiashuidhiushaiuhsduidahiu
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 4.5 }}
            ></TextField>
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
      <FormControlLabel control={<Switch defaultChecked />} label="News and Updates" />
      <FormControlLabel control={<Switch />} label="Activity" />
    </FormGroup>
  );
}

export function SwitchNotifaction() {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Browser Notifications" />
    </FormGroup>
  );
}

const Security = (props:{user:User}) => {
  const [passOpen, setPassOpen] = React.useState(false);

  const [delOpen, setDelOpen] = React.useState(false);

  const [email, setEmail] = useState("");

  const [changePassword, setChangePassword] = useState({email: props.user.email, oldPassword: "test", 
    newPassword: "test", repeatPassword: "test"});

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordConfirm, setChangePasswordConfirm] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    setChangePassword({email: props.user.email, oldPassword: oldPassword, newPassword: newPassword, repeatPassword: changePasswordConfirm});
    console.log(changePassword);
    updtePassword();
  }

  const deleteAccount = () => {
    deleteUser(email)
        .then((response) => {
            if (response.status === HttpStatusCode.NoContent) {
                console.log("Account deleted");
                navigate("/login");
            } else {
                console.log("Error", response.statusText);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

  const updtePassword = () => {
    updatePassword(changePassword)
        .then((response) => {
            if (response.status === HttpStatusCode.NoContent) {
                console.log("Password changed");
                navigate("/login");
            } else {
                console.log("Error", response.statusText);
            }
        })
        .catch((error) => {
            console.log(error);
        });
  };

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
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setChangePasswordConfirm(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={passwordClose}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteClose}>Cancel</Button>
          <Button onClick={deleteAccount}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Appearance = (props: { onChageTheme: (newTheme: Theme) => void }) => {
    const lightThemeHandler = () => {
        props.onChageTheme(Theme.LIGHT);
    };
    const darkThemeHandler = () => {
        props.onChageTheme(Theme.DARK);
    };

    return (
        <>
            <h1>Appearance</h1>
            <p>Display Mode</p>
            <div className="ButtonGroup">
                <button onClick={lightThemeHandler} className="LightButton">
                    <strong>compsigh light</strong>
                </button>
                <button onClick={darkThemeHandler} className="DarkButton">
                    <strong>compsigh dark</strong>
                </button>
            </div>
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
	// const [Open, setOpen] = React.useState(false);
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

	const onChageThemeHandler = (newTheme: Theme) => {
        changeTheme({ theme: newTheme })
            .then((response) => {
                if (response.status === HttpStatusCode.NoContent) {
                    console.log("Theme changed");
                    setTheme(newTheme);
                } else {
                    console.log("Error", response.statusText);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

  useEffect(() => {
      getUser()
          .then((response) => {
              if (response.status === 200) {
				  setUser(response.data);
				  setTheme(response.data.theme);
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
          {state === "Security" && <Security user={user}/>}
          {state === "Appearance" && <Appearance onChageTheme={onChageThemeHandler} />}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
