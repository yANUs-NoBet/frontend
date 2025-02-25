import React, { useState, useEffect }from "react";
import ToggleButton from "../components/ToggleButton";
import ButtonGroup from "../components/ButtonGroup.jsx";
import '../pages_styles/Home.css'
import {useCookieManager} from '../customHook/useCookieManager'

function Home() {
  const { getCookies, setCookies, removeCookies } = useCookieManager();
  const findUser = async (e)  =>{
    const localAccesstoken = getCookies().accessToken;
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localAccesstoken}`
      }
    });
    console.log(await response.json());
  }
  useEffect(()=>{
    findUser();
  })

  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div>
      <div className="main-function">
        <h1 className="intro-text">Gambling Site Blocker</h1>
        <h1 className="blocked-state">{isBlocked ? "차단 활성화" : "차단 비활성화"}</h1>
        <p className="blocked-total-count">총 차단됨 : 0</p>
        <ToggleButton isBlocked={isBlocked} setIsBlocked={setIsBlocked}/>
      </div>
      <ButtonGroup></ButtonGroup>
    </div>
  );
}

export default Home;
