import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { SettingsPage } from "./pages/dashboard/Settings";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { ComponentTests } from "./pages/tests/ComponentTests";
import { StylesTests } from "./pages/tests/StylesTests";
import { OurTeam } from "./pages/OurTeam";
// import { Header } from "./components/header";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ourTeam" element={<OurTeam />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setting" element={<SettingsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/componentTests" element={<ComponentTests />} />
            <Route path="/stylesTests" element={<StylesTests />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
