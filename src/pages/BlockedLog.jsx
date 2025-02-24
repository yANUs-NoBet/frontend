import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // ❌ 아이콘 적용
import "../pages_styles/BlockedLog.css";

const serverURL = `${import.meta.env.VITE_SERVER_URL}`;

function BlockedLog() {
  // 🔹 차단된 사이트 목록 (백엔드에서 불러올 데이터)
  const [filteredSites, setFilteredSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // ✅ 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // ✅ 더 불러올 데이터가 있는지 여부

  // 🔹 백엔드에서 차단된 사이트 목록 가져오기 (useEffect 사용)
  useEffect(() => {
    fetchBlockedSites(0); // 처음 페이지 로드 시 `page=0`부터 가져오기
  }, []);

  // 🔹 백엔드에서 데이터 가져오는 함수
  async function fetchBlockedSites(pageNumber) {
    try {
      const response = await fetch(`${serverURL}/blackUrls/getBlackUrls?page=${pageNumber}&size=5`);
      const data = await response.json();
      console.log("Fetched Data:", data);

      // ✅ 데이터 구조 확인
      if (data.resultData && data.resultData.content) {
        const newSites = data.resultData.content.map((item) => item.blackUrl);
        console.log("Extracted URLs:", newSites); // ✅ 추출된 데이터 확인

        setFilteredSites((prevSites) => [...prevSites, ...newSites]);
        setHasMore(newSites.length > 0); // ✅ 추가 데이터가 있는지 확인
      } else {
        console.warn("No content found in API response:", data);
        setHasMore(false); // ✅ 데이터가 없으면 더 이상 로드하지 않음
      }

      setLoading(false); // ✅ 데이터 로드 완료
    } catch (error) {
      console.error("Failed to fetch blocked sites:", error);
      setLoading(false);
    }
  }

  // 🔹 차단 해제 요청 (백엔드에 삭제 요청)
  const handleUnblock = async (site) => {
    try {
      const response = await fetch(`${serverURL}/blackUrls/unblock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blackUrl: site }), // ✅ 백엔드에 맞게 수정
      });

      if (response.ok) {
        setFilteredSites((prevSites) => prevSites.filter((s) => s !== site)); // ✅ UI에서 즉시 제거
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
              <th>차단일일</th>
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
                  <td className="delete-cell"></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 추가 로드 버튼 */}
      {hasMore && (
        <button
          className="load-more-button"
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchBlockedSites(nextPage);
          }}
        >
          더보기
        </button>
      )}
    </div>
  );
}

export default BlockedLog;
