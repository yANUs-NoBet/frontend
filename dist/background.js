const API_URL = "http://220.69.241.35:8080/blackUrls/isBlackUrl"; // ✅ 백엔드 API 주소

// ✅ 크롬 익스텐션 설치 이벤트 리스너 등록
chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 크롬 익스텐션 설치됨!");

    // ✅ 웹사이트 이동 전에 도박 사이트 필터링
    chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
        if (!details.url.startsWith("http")) return; // ✅ http/https가 아닌 URL 무시

        try {
            // ✅ 크롬 스토리지에서 `isBlocked` 상태 가져오기 (비동기 처리)
            const getStorageData = (key) => {
                return new Promise((resolve, reject) => {
                    chrome.storage.local.get([key], (result) => {
                        if (chrome.runtime.lastError) {
                            console.error("❌ Storage 오류:", chrome.runtime.lastError);
                            reject(chrome.runtime.lastError);
                            return;
                        }
                        console.log("📦 Storage 값 가져옴:", result); // 디버깅 로그 추가
            
                        // ✅ result가 정상적으로 존재하는지 확인 후 반환
                        resolve(result && result[key] !== undefined ? result[key] : null);
                    });
                });
            };

            const isBlocked = await getStorageData("isBlocked") ?? false; // 기본값 false
            console.log("🚦 현재 차단 기능 상태:", isBlocked ? "활성화 ✅" : "비활성화 ❌");

            if (!isBlocked) {
                console.log("⏸ 차단 기능이 비활성화됨. 동작하지 않음.");
                return;
            }

            // ✅ URL에서 순수 도메인만 추출하는 함수
            const extractDomain = (url) => {
                try {
                    const hostname = new URL(url).hostname; // `https://ct8855.com/sdfasdf` → `ct8855.com`
                    return hostname.replace(/^www\./, ""); // `www.`이 있으면 제거
                } catch (error) {
                    console.error("❌ URL 파싱 오류:", error);
                    return null;
                }
            };

            // ✅ 정리된 도메인 가져오기
            const domain = extractDomain(details.url);
            if (!domain) return;

            console.log(`🔍 도메인 검사 중: ${domain}`);

            // ✅ 백엔드로 도메인만 보내기
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: domain }) // ✅ 정리된 도메인 전송
            });

            const data = await response.json();

            if (data.resultData === true) { // ✅ 차단된 사이트 감지
                console.log(`🚨 차단된 사이트 감지: ${domain}`);

                // ✅ `chrome.tabs.update()`를 사용하여 강제 리디렉트
                chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") });
            } else {
                console.log(data)
                console.log(`✅ 안전한 사이트: ${domain}`);
            }
        } catch (error) {
            console.error("❌ URL 검사 중 오류 발생:", error);
        }
    }, { url: [{ schemes: ["http", "https"] }] });
});

// ✅ `isBlocked` 상태가 변경될 때 `background.js`가 즉시 반응하도록 설정
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.isBlocked) {
        console.log("🔄 차단 기능 상태 변경 감지: ", changes.isBlocked.newValue);
    }
});
