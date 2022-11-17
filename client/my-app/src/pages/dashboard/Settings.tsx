import { width } from "@mui/system";
import React from "react"
import { createContext } from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header"
import { ComponentTests } from "../tests/ComponentTests";
import './Settings.css'
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
                <h3 id = "content-name">Security</h3>
        </div>
        </div>
        <Footer/>
        </>
    );}


    /*
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
            <h3 id = "content-name">Security</h3>
        </div>
        </div>
        */