import { width } from "@mui/system";
import React from "react"
import { createContext } from "react";
import { Footer } from "../footer";
import { Header } from "../header"
import { ComponentTests } from "../../pages/tests/ComponentTests";
import './Settings.css'

/*|-------------------------------------------------------------------------------------Contents Component-------------------------------------------------------------------------------------|*/
const Profile = () => {
    return (
        <>
        <h1>This is the Profile Page!</h1>
        </>
    )
}

const Security = () =>{
    return (
        <>
            <h3 id = "content-name">Security</h3>
            <h4>Password</h4>
            <button className="Button">Change</button>
            <hr className = "Hr"/>
            <h4>2 Factor Authentication</h4>
            <button className="Button">Enable</button>
            <h4>Delete Account</h4>
            <button className="Button">Delete</button>
        </>
    )
}

const Appearance = () => {
    return (
        <>
        <h1>This is the Appearance Page!</h1>
        </>
    )
}


/*|------------------------------------------------------------------------------------Settings Page Render------------------------------------------------------------------------------------|*/
export const SettingsPage = () => {
    const [state, setState] = React.useState("Profile"); //originaly false
    return (
        <>
        <Header/>
        <div className="Settings">
            <div className="Sidebar">
                <h3 id = "sidebar-title">Settings</h3>
                <div className="Sidebar-List">
                    <div className="Sidebar-Item">
                        <nav>
                            <button onClick={() => setState("Profile")}>Profile</button>
                            <button onClick={() => setState("Security")}>Security</button>
                            <button onClick={() => setState("Appearance")}>Appearance</button>
                        </nav>
                        <h4>Profile</h4>
                        <h4>Security</h4>
                        <h4>Appearance</h4>
                        <h4>Music Player</h4>
                    </div>
                </div>
            </div>
            <div className="Content">
                {state === "Profile" && <Profile/>} 
                {state === "Security" && <Security/>}
                {state === "Appearance" && <Appearance/>}
            {/* <button className="Sidebar-Button" onClick={() => setState(!state)}>Security</button> */}
            {/* {state? <Security/> : <Profile/>} */}
        </div>
        </div>
        <Footer/>
        </>
        
    );}




    /*
    export const SettingsPage = () => {
    return (
        <>
        <Header/>
        <div className="Settings">
            <div className="Sidebar">
                <h3 id = "sidebar-title">Settings</h3>
                <div className="Sidebar-List">
                    <div className="Sidebar-Item">
                        <h4>Profile</h4>
                        <h4>Security</h4>
                        <h4>Appearance</h4>
                        <h4>Music Player</h4>
                        </div>
                        </div>
                    </div>
                    <div className="Content">
                        <Security/>
                </div>
                </div>
                <Footer/>
                </>
                
            );}
        */