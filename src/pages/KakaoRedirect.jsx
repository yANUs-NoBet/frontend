import { useNavigate } from "react-router-dom";
import { useCookieManager } from "../customHook/useCookieManager";
import { useEffect, useState } from "react";

function KakaoRedirect() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setCookies } = useCookieManager();

  const onLoginSuccess = () => {
    setErrorMessage("");
  };

  const onLoginFailure = (message) => {
    setErrorMessage(message);
  };

  useEffect(() => {
    // ✅ `window.location.href`에서 `?` 이후 부분 가져오기
    const queryString = window.location.href.split("?")[1];
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setCookies(accessToken, refreshToken);
      alert(accessToken);
      onLoginSuccess();
      navigate("/");
    } else {
      onLoginFailure("OAuth login failed. Missing tokens.");
      console.log(errorMessage);
    }
  }, [navigate, onLoginSuccess, onLoginFailure, setCookies]);

  return <div>로그인중</div>;
}

export default KakaoRedirect;
