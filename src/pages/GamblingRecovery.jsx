import React from "react";
import "../pages_styles/GamblingRecovery.css";

function GamblingRecovery() {
  return (
    <div className="recovery-container">
      <h1 className="page-title">도박 중독 치료 센터 정보</h1>
      <p className="intro-text">
        도박 중독은 극복할 수 있습니다. 전문가와 함께 건강한 삶을 되찾으세요.
      </p>

      {/* 전화 상담 정보 */}
      <div className="info-box">
        <h2>📞 전화 상담</h2>
        <p>
          국번 없이 <strong>1336</strong>으로 전화하면 <br />
          **365일 오전 9시 ~ 오후 10시**까지 상담이 가능합니다.
        </p>
      </div>

      {/* 온라인 상담 정보 */}
      <div className="info-box">
        <h2>💻 온라인 상담</h2>
        <p>
          <a href="https://www.kcgp.or.kr/portal/main/main.do" target="_blank" rel="noopener noreferrer">
            넷라인 상담 바로가기
          </a>
        </p>
      </div>
    </div>
  );
}

export default GamblingRecovery;
