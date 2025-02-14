import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { FaCog } from "react-icons/fa";
import "./App.css";
import dividerImg from "./assets/divider.png";
import logo from './assets/nobet-logo.png'
import ToggleButton from "./components/ToggleButton";
import ButtonGroup from './components/ButtonGroup';

const App = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // 🔥 토글 상태 추가
  const { seconds, minutes, hours, start, pause } = useStopwatch({ autoStart: false });
  const [isEnabled, setIsEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  

  return (
    <div className="container">

      {/* Navigation Bar */}
      <div className="nav-bar">
        <img src={logo} alt="NoBet Logo" className="nav-logo" />
        <FaCog className="nav-icon" />
      </div>

      {/* main function-group */}
      <div className="main-function">
        <h1 className="intro-text">Gambling Site Blocker</h1>
        <h1 className="title-block">차단: 0개</h1>
        <p className="total-block">총 차단됨 : 0</p>
        <ToggleButton></ToggleButton>
      </div>
      <ButtonGroup></ButtonGroup>
    </div>
  );
};


export default App;
