import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // ❌ 아이콘 적용
import '../pages_styles/AddWhite.css';
import {useCookieManager} from '../customHook/useCookieManager'

function AddWhite() {
  const [site, setSite] = useState(""); // 입력 값
  const [whitelist, setWhitelist] = useState([]); // 차단 제외 목록
  const { getCookies, removeCookies } = useCookieManager();
  // 🔹 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    setSite(e.target.value);
  };

  const fetchWhiteList = async () => {
    const cookies = getCookies();
    console.log("쿠키 데이터:", cookies); // 쿠키 확인
    const localAccessToken = cookies.accessToken;
    if (localAccessToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/whiteUrls/getWhiteUrls`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('화이트 리스트 가져오기:', data.resultData); // 응답 데이터 확인
      } catch (error) {
        console.error('화이트 리스트 불러오기 오류:', error);
        removeCookies(); // 오류 시 쿠키 제거 및 로그아웃 처리
      }
    } else {
      console.warn("AccessToken이 존재하지 않습니다.");
    }
  };
  

  // 🔹 차단 제외 목록에 추가 (입력 값 그대로 추가)
  const handleAdd = () => {
    if (site.trim() !== "" && !whitelist.includes(site)) {
      setWhitelist([...whitelist, site]); // 입력한 값 그대로 저장
      setSite("");
    }
  };

  // 🔹 Enter 키 입력 시 자동 추가
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  // 🔹 목록에서 제거
  const handleRemove = (index) => {
    const newWhitelist = whitelist.filter((_, i) => i !== index);
    setWhitelist(newWhitelist);
  };

  useEffect(() => {
    fetchWhiteList();
  },[])

  return (
    <div className="whitelist-container">
      <h1 className="page-title">차단 제외 리스트</h1>

      {/* 입력 필드 & 추가 버튼 */}
      <div className="input-group">
        <input
          type="text"
          placeholder="예: example.com"
          value={site}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Enter 키 이벤트 추가
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      {/* URL 리스트 (스크롤 가능) */}
      <div className="whitelist-box">
        <table className="whitelist-table">
          <thead>
            <tr>
              <th>사이트 URL</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {whitelist.length === 0 ? (
              <tr>
                <td colSpan="2" className="empty-message">차단 제외 사이트가 없습니다</td>
              </tr>
            ) : (
              whitelist.map((item, index) => (
                <tr key={index}>
                  <td className="url-cell">{item}</td>
                  <td className="delete-cell">
                    <button onClick={() => handleRemove(index)} className="delete-button">
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddWhite;
