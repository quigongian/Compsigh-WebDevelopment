import { width } from "@mui/system";
import React from "react"
import { createContext } from "react";
import { Footer } from "../footer";
import { Header } from "../header"
import { ComponentTests } from "../../pages/tests/ComponentTests";
import './Settings.css'

/*|---------------------------------------------------------------------------------Contents Component---------------------------------------------------------------------------------|*/
const Profile = () => {
    return (
        <>
        <h3 id = "content-title">Profile</h3>
        <div id="user-profile">
            <div className="pimage-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRCv5FR_Cwd5cBZ3-BF95ZX00tNZcEJt5Xi9D065i-g&s" id="user-image" alt="Avatar"></img>
            </div>
            <div className="pinfo-container">
                <ul>
                    <li><h4>Frank Beans (name)</h4></li>
                    <li><h4>frank@lovesbeans.com (email)</h4></li>
                    <li><h4>Data Engineer (career path)</h4></li>
                    <li><h4>Expert (experience lvl)</h4></li>
                </ul>
            </div>
        </div>
        <div className="SPACER">
        </div>
        <hr className="Hr"/>
        <div className="pedit-container">
        <ProfileEdit />
        </div>
        <hr className="Hr"/>
        <div className="notification-container">
            <h3>Notifications</h3>
            <div className="n-email">
                <h4>Email</h4>
            </div>
            <div className="n-push">
                <h4>Push</h4>
            </div>
        </div>
        </>
    )
}

const ProfileEdit = () => {
    return (
        <>
        
        </>
    )
}

const Security = () =>{
    return (
        <>
            <h3 id = "content-title">Security</h3>
            <h4>Password</h4>
            <button className="Button">Change</button>
            <hr className = "Hr"/>
            <h4>2 Factor Authentication</h4>
            <button className="Button">Enable</button>
            <hr className = "Hr"/>
            <h4>Delete Account</h4>
            <button className="Button">Delete</button>
        </>
    )
}

const Appearance = () => {
    return (
        <>
            <h1>Appearance</h1>
            <p>Display Mode</p>
            <div className = "ButtonGroup">
                <button className = "LightButton">comsigh light</button>
                <button className = "DarkButton">comsigh dark</button>
            </div>
            <p>Accessibility</p>
        </>
    )
}

const Sidebar = () => {
    return (
        <>

        </>
    )
}

/*|--------------------------------------------------------------------------------Settings Page Render--------------------------------------------------------------------------------|*/
export const SettingsPage = () => {
    const [state, setState] = React.useState("Profile"); //default state is profile
    const [Open, setOpen] = React.useState(false);
    return (
        <>
        <Header/>
        <div className="Settings">
            <div className="Sidebar">
                <h3 id = "sidebar-title">Settings</h3>
                <div className="Sidebar-List">
                    <div className="Sidebar-Item">
                        <nav>
                            <ul>
                                <li><button onClick={() => setState("Profile")}>Profile</button></li>
                                <li><button onClick={() => setState("Security")}>Security</button></li>
                                <li><button onClick={() => setState("Appearance")}>Appearance</button></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="Content">
                {state === "Profile" && <Profile/>} 
                {state === "Security" && <Security/>}
                {state === "Appearance" && <Appearance/>}
        </div>
        </div>
        <Footer/>
        </>
        
    );}