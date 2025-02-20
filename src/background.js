const API_URL = "http://localhost:8080/blackUrls/isBlackUrl"; // 백엔드 API 주소

chrome.runtime.onInstalled.addListener(() => {
    chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
        if (!details.url.startsWith("http")) return; // http/https가 아닌 URL 무시

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: details.url }) // JSON 형식으로 데이터 전송
            });

            const data = await response.json();

            if (data.data === true) { // data.data가 true이면 차단된 사이트
                chrome.scripting.executeScript({
                    target: { tabId: details.tabId },
                    func: () => { 
                        window.location.href = chrome.runtime.getURL("blocked.html");
                    }
                });
            }
        } catch (error) {
            console.error("Error checking URL:", error);
        }
    }, { url: [{ schemes: ["http", "https"] }] });
});
