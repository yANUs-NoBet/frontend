import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import logo from "../assets/nobet-logo.png";
import "../components_styles/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <img src={logo} alt="NoBet Logo" className="nav-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <div className="icon-group">
      <AiOutlineUser
          className="nav-icon"
          size={24}
          onClick={() => navigate("./login")} // ✅ 프로필 페이지로 이동
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
