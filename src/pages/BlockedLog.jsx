import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // ❌ 아이콘 적용
import '../pages_styles/BlockedLog.css';

function BlockedLog() {
  // 🔹 차단된 사이트 목록 (백엔드에서 불러올 데이터)
  const [filteredSites, setFilteredSites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 백엔드에서 차단된 사이트 목록 가져오기 (useEffect 사용)
  useEffect(() => {
    async function fetchBlockedSites() {
      try {
        // TODO: 백엔드 API URL을 여기에 넣기
        const response = await fetch("https://your-backend-api.com/blocked-sites");
        const data = await response.json();
        setFilteredSites(data.sites); // 예시 데이터 구조 { sites: ["badwebsite.com", "malicious-site.org"] }
      } catch (error) {
        console.error("차단된 사이트 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlockedSites();
  }, []);

  // 🔹 차단 해제 요청 (백엔드에 삭제 요청)
  const handleUnblock = async (site) => {
    try {
      // TODO: 백엔드 API URL을 여기에 넣기
      const response = await fetch("https://your-backend-api.com/unblock-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site }),
      });

      if (response.ok) {
        setFilteredSites(filteredSites.filter((s) => s !== site));
      } else {
        console.error("차단 해제 요청 실패");
      }
    } catch (error) {
      console.error("차단 해제 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="filtered-container">
      <h1 className="page-title">필터링된 사이트 목록</h1>

      {/* 로딩 상태 표시 */}
      {loading ? <p className="loading-message">차단된 사이트를 불러오는 중...</p> : null}

      {/* 사이트 목록 테이블 */}
      <div className="filtered-box">
        <table className="filtered-table">
          <thead>
            <tr>
              <th>사이트 URL</th>
              <th>차단 해제</th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.length === 0 ? (
              <tr>
                <td colSpan="2" className="empty-message">필터링된 사이트가 없습니다</td>
              </tr>
            ) : (
              filteredSites.map((site, index) => (
                <tr key={index}>
                  <td className="url-cell">{site}</td>
                  <td className="delete-cell">
                    <button onClick={() => handleUnblock(site)} className="unblock-button">
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

export default BlockedLog;
