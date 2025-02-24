import React, { useState, useEffect } from "react";
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
      const response = await fetch(`${serverURL}/blackUrls/getBlackUrls?page=${pageNumber}&size=10`);
      const data = await response.json();
      console.log("Fetched Data:", data);

      // ✅ 데이터 구조 확인 및 저장
      if (data.resultData && data.resultData.content) {
        const newSites = data.resultData.content.map((item) => ({
          blackUrl: item.blackUrl,
          blockedAt: item.blockedAt, // ✅ 차단된 날짜 포함
        }));

        setFilteredSites((prevSites) => [...prevSites, ...newSites]);
        setHasMore(newSites.length > 0); // ✅ 추가 데이터가 있는지 확인
      } else {
        setHasMore(false); // ✅ 데이터가 없으면 더 이상 로드하지 않음
      }

      setLoading(false); // ✅ 데이터 로드 완료
    } catch (error) {
      console.error("Failed to fetch blocked sites:", error);
      setLoading(false);
    }
  }

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
              <th>차단 날짜</th> {/* ✅ 차단 날짜 추가 */}
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
                  <td className="url-cell">{site.blackUrl}</td>
                  <td className="date-cell">
                    {site.blockedAt }
                  </td> {/* ✅ 차단 날짜 표시 */}
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
          더 불러오기
        </button>
      )}
    </div>
  );
}

export default BlockedLog;
