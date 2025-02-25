import React, { useState, useEffect } from "react";
import "../pages_styles/BlockedLog.css";

const serverURL = `${import.meta.env.VITE_SERVER_URL}`;

function BlockedLog() {
  const [filteredSites, setFilteredSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlockedSites(currentPage);
  }, [currentPage]);

  async function fetchBlockedSites(pageNumber) {
    try {
      const response = await fetch(
        `${serverURL}/blackUrls/getBlackUrls?page=${pageNumber}&size=5`
      );
      const data = await response.json();

      if (data.resultData && data.resultData.content) {
        setFilteredSites(data.resultData.content);
        setTotalPages(data.resultData.totalPages);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blocked sites:", error);
      setLoading(false);
    }
  }

  return (
    <div className="blocked-container">
      <h1 className="page-title">차단 사이트 목록</h1>

      <div className="blocked-list">
        {filteredSites.length === 0 ? (
          <p className="empty-message">차단된 사이트가 없습니다</p>
        ) : (
          filteredSites.map((site, index) => (
            <div className="site-card" key={index}>
              <h3 className="site-url">{site.blackUrl}</h3>
              <p className="blocked-date">{site.blockedAt}</p>
            </div>
          ))
        )}
      </div>

      {/* ✅ 페이지네이션 */}
      <div className="pagination">
        <button
          className="nav-button prev"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          ←
        </button>
        <p className="page-info">
          Page {currentPage} / {totalPages}
        </p>
        <button
          className="nav-button next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default BlockedLog;
