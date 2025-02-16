import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import logo from "../assets/nobet-logo.png";
import '../components_styles/NavBar.css'

export default function NavBar() {
  const navigate = useNavigate(); 
  return (
    <div className="nav-bar">
      <img src={logo} alt="NoBet Logo" className="nav-logo" />
      <AiOutlineHome
        className="nav-icon"
        size={20}
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
