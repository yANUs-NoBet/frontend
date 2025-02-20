import { useEffect } from "react";
import { Check, X } from "lucide-react";
import "../components_styles/ToggleButton.css";

const TOGGLE_STORAGE_KEY = "isBlocked"; // ✅ LocalStorage 키

export default function ToggleButton({ isBlocked, setIsBlocked }) {
  // ✅ 저장된 토글 상태를 불러오는 함수
  useEffect(() => {
    const storedState = localStorage.getItem(TOGGLE_STORAGE_KEY);
    if (storedState !== null) {
      setIsBlocked(storedState === "true"); // ✅ 문자열을 Boolean 값으로 변환
    }
  }, []);

  // ✅ 토글 버튼 클릭 시 실행되는 함수
  const handleToggle = () => {
    const newBlockedState = !isBlocked; // ✅ 상태 변경
    setIsBlocked(newBlockedState); // ✅ UI 업데이트
    localStorage.setItem(TOGGLE_STORAGE_KEY, newBlockedState.toString()); // ✅ 상태 저장
  };

  return (
    <div className="toggle-container" onClick={handleToggle}>
      <div className={`toggle-track ${isBlocked ? "enabled" : "disabled"}`}>
        <div className="toggle-circle">
          {isBlocked ? <Check className="icon" size={20} /> : <X className="icon" size={20} />}
        </div>
      </div>
    </div>
  );
}
