import React, { useState } from "react";
import { X } from "lucide-react"; // ❌ 아이콘 적용
import '../pages_styles/AddWhite.css'

function AddWhite() {
  const [site, setSite] = useState(""); // 입력 값
  const [whitelist, setWhitelist] = useState([]); // 차단 제외 목록

  // 🔹 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    setSite(e.target.value);
  };

  // 🔹 차단 제외 목록에 추가
  const handleAdd = () => {
    if (site.trim() !== "" && !whitelist.includes(site)) {
      setWhitelist([...whitelist, site]);
      setSite("");
    }
  };

  // 🔹 목록에서 제거
  const handleRemove = (index) => {
    const newWhitelist = whitelist.filter((_, i) => i !== index);
    setWhitelist(newWhitelist);
  };

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
                    <button onClick={() => handleRemove(index)}>
                      <X size={18} color="red" />
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
