import { useNavigate } from "react-router-dom";
import { useCookieManager } from "../customHook/useCookieManger";
import { useEffect,useState } from "react";

function Profile() {
  const [errorMessage,setErrorMessage]=useState("");
  const navigate=useNavigate();
  const { setCookies }=useCookieManager();

  const onLoginSuccess=()=>{
    setErrorMessage("");
  }

  const onLoginFailure=(message)=>{
    setErrorMessage(message);
  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const accessToken=urlParams.get("accessToken");
    const refreshToken=urlParams.get("refreshToken");

    if(accessToken && refreshToken){
      setCookies(accessToken,refreshToken);
      onLoginSuccess();
      navigate("/");
    }
    else{
      onLoginFailure("OAuth login failed. Missing tokens.")
      navigate("/");
      console.log(errorMessage)
    }
  },[navigate,onLoginSuccess,onLoginFailure,setCookies])

  return (
    <div>
      로그인중
    </div>
  );
}
export default Profile;