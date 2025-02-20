import React, { useState } from "react";
import "../pages_styles/ReportIssue.css";

function ReportIssue() {
  // 🔹 신고 데이터 상태
  const [reportType, setReportType] = useState("gambling"); // 기본값: 도박 사이트 신고
  const [reportedUrl, setReportedUrl] = useState(""); // 신고할 URL
  const [description, setDescription] = useState(""); // 추가 설명
  const [message, setMessage] = useState(""); // 성공/실패 메시지

  // 🔹 신고 데이터 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setMessage("설명을 입력해주세요.");
      return;
    }

    const reportData = {
      type: reportType,
      url: reportedUrl.trim(),
      description: description.trim(),
    };

    try {
      // TODO: 백엔드 API URL을 여기에 추가
      const response = await fetch("https://your-backend-api.com/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setMessage("신고가 접수되었습니다. 감사합니다!");
        setReportedUrl("");
        setDescription("");
      } else {
        setMessage("신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("신고 요청 오류:", error);
      setMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="report-container">
      <h1 className="page-title">문제 신고</h1>
      <p className="description-text">잘못된 차단, 위험한 사이트 등을 신고해주세요.</p>

      {/* 신고 유형 선택 */}
      <div className="form-group">
        <label>신고 유형:</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="gambling">도박 사이트 신고</option>
          <option value="false_positive">허위 차단 신고</option>
          <option value="other">기타 신고</option>
        </select>
      </div>

      {/* 신고할 URL 입력 */}
      <div className="form-group">
        <label>신고할 URL (선택 사항):</label>
        <input
          type="text"
          placeholder="예: example.com"
          value={reportedUrl}
          onChange={(e) => setReportedUrl(e.target.value)}
        />
      </div>

      {/* 추가 설명 입력 */}
      <div className="form-group">
        <label>추가 설명:</label>
        <textarea
          placeholder="문제 내용을 설명해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 신고 버튼 */}
      <button className="submit-button" onClick={handleSubmit}>신고 제출</button>

      {/* 메시지 출력 */}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default ReportIssue;
