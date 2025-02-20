import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import AddWhite from './pages/AddWhite';
import BlockedLog from './pages/BlockedLog';
import ReportIssue from "./pages/ReportIssue";
import GamblingRecovery from "./pages/GamblingRecovery";
import KakaoRedirect from "./pages/KakaoRedirect";

const App = () => {

  return (
    <Router>
      <div className="container">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-white" element={<AddWhite />} />
          <Route path="/blocked-log" element={<BlockedLog />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/treat-center" element={<GamblingRecovery />} />
          <Route path="/oauth" element={<KakaoRedirect />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
