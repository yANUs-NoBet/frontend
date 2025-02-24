import React from "react";
import "../pages_styles/Login.css"; // ✅ 스타일 적용
import loginIcon from "../assets/login-icon.png"; // ✅ 아이콘 추가
import KakaoLogo from "../assets/kakao-logo.png";
import { useCookieManager } from "../customHook/useCookieManager"; // ✅ 쿠키 관리 훅
import { useNavigate } from "react-router-dom";

const kakaoURL = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`;

export default function Login() {
  const { getCookies, removeCookies } = useCookieManager();
  const navigate = useNavigate();

  // ✅ 현재 로그인 상태 확인 (쿠키에서 accessToken 가져오기)
  const cookies = getCookies();
  const isLoggedIn = !!cookies.accessToken; // `accessToken`이 있으면 true, 없으면 false

  // ✅ 로그인 버튼 클릭 (팝업 창에서 로그인)
  const handleLogin = (e) => {
    e.preventDefault();

    if (chrome.windows) {
      // ✅ 크롬 익스텐션 환경에서 새 창(팝업) 열기
      chrome.windows.create({
        url: kakaoURL,
        type: "popup",
        width: 500,
        height: 600
      });
    } else {
      // ✅ 일반 웹 환경에서는 기존 방식 유지
      window.location.href = kakaoURL;
    }
  };

  // ✅ 로그아웃 버튼 클릭 (쿠키 삭제)
  const handleLogout = () => {
    removeCookies(); // ✅ 쿠키 삭제
    navigate("/login"); // ✅ 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* ✅ 아이콘 추가 */}
        <img src={loginIcon} alt="로그인 아이콘" className="login-icon" />

        <h2>{isLoggedIn ? "로그아웃" : "로그인"}</h2>
        <p>{isLoggedIn ? "로그아웃하시겠습니까?" : "간편하게 로그인하고 서비스를 이용하세요."}</p>

        {/* ✅ 로그인 상태에 따라 버튼 변경 */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            로그아웃
          </button>
        ) : (
          <button onClick={handleLogin} className="kakao-btn">
            <img src={KakaoLogo} alt="카카오 로고" className="kakao-icon" />
            카카오톡으로 계속하기
          </button>
        )}
      </div>
    </div>
  );
}
