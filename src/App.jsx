import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import "./App.css";
import logo from './assets/nobet-logo.png';
import Home from './pages/Home';
import AddWhite from './pages/AddWhite';

const App = () => {

  return (
    <Router>
      <div className="container">

        {/* Navigation Bar */}
        <div className="nav-bar">
          <img src={logo} alt="NoBet Logo" className="nav-logo" />
          <FaCog className="nav-icon" />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-white" element={<AddWhite />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
