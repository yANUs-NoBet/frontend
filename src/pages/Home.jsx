import React, { useState }from "react";
import ToggleButton from "../components/ToggleButton";
import ButtonGroup from "../components/ButtonGroup.jsx";

function Home() {

  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div>
      <div className="main-function">
        <h1 className="intro-text">Gambling Site Blocker</h1>
        <h1 className="blocked-count">{isBlocked ? "차단 활성화" : "차단 비활성화"}</h1>
        <p className="blocked-total-count">총 차단됨 : 0</p>
        <ToggleButton isBlocked={isBlocked} setIsBlocked={setIsBlocked}/>
      </div>
      <ButtonGroup></ButtonGroup>
    </div>
  );
}

export default Home;
