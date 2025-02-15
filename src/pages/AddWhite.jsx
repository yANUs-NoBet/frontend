import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

function AddWhite() {
  const [site, setSite] = useState(""); // 입력 값
  const [whitelist, setWhitelist] = useState([]); // 차단 제외 목록

  // 🔹 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    setSite(e.target.value);
  };

  // 🔹 차단 제외 목록에 추가
  const handleAdd = () => {
    if (site.trim() !== "") {
      setWhitelist([...whitelist, site]); // 기존 목록에 추가
      setSite(""); // 입력 필드 초기화
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

      {/* 빈 테이블을 기본으로 표시 */}
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
              <td colSpan="2" className="empty-message">
                차단 제외 사이트가 없습니다
              </td>
            </tr>
          ) : (
            whitelist.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>❌</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddWhite;
