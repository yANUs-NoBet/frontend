import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { FaCog } from "react-icons/fa";
import "./App.css";
import dividerImg from "./assets/divider.png";

const App = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [now_state, change_state] = useState("Block?");

  const handleStartStop = () => {
    if (!isRunning) {
      start(); // 타이머 시작
      change_state("Blocked 0 time");
    } else {
      pause(); // 타이머 정지
      change_state("Block?");
    }
    setIsRunning((prev) => !prev); // 🔥 실행 상태 토글
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h2 className="title">NoBet</h2>
        <FaCog className="settings-icon" />
      </div>

      {/* Block Title */}
      <h1 className="block-title">{now_state}</h1>
      <p>안녕녕</p>
      {/* Buttons */}
      <div className="group-btn">
        <button className="start-button" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <div className="list-button-group">
          <button className="list-button">Black list</button>
          <button className="list-button">White list</button>
        </div>
        <button className="history-button">Access History</button>
      </div>
    </div>
  );
};

export default App;
