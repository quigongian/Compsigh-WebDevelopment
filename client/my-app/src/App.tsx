import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { SettingsPage } from "./pages/Settings";
import { LandingPage } from "./pages/dashboard/landing";
import { CheckInPage } from "./pages/dashboard/CheckIn";
import { TimerPage } from "./pages/dashboard/Timer";
import { TodoPage } from "./pages/dashboard/Todo";
import { Login } from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<SettingsPage/>}/>
          <Route path="/dashboard/landing" element={<LandingPage/>}/>
          <Route path="/dashboard/CheckIn" element={<CheckInPage/>}/>
          <Route path="/dashboard/Timer" element={<TimerPage/>}/>
          <Route path="/dashboard/Todo" element={<TodoPage/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;