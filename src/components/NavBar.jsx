import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import logo from "../assets/nobet-logo.png";
import "../components_styles/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <img src={logo} alt="NoBet Logo" className="nav-logo" />
      <div className="icon-group">
      <AiOutlineUser
          className="nav-icon"
          size={24}
          onClick={() => navigate("./profile")} // ✅ 프로필 페이지로 이동
          style={{ cursor: "pointer" }}
        />
        <AiOutlineHome
          className="nav-icon"
          size={22}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

      </div>
    </div>
  );
}
