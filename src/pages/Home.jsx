import React from "react";
import ToggleButton from "../components/ToggleButton";
import ButtonGroup from "../components/ButtonGroup.jsx";

function Home() {
  return (
    <div>
      <div className="main-function">
        <h1 className="intro-text">Gambling Site Blocker</h1>
        <h1 className="title-block">차단: 0개</h1>
        <p className="total-block">총 차단됨 : 0</p>
        <ToggleButton />
      </div>
      <ButtonGroup></ButtonGroup>
    </div>
  );
}

export default Home;
