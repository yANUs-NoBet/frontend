const API_URL = "http://220.69.241.35:8080/blackUrls/isBlackUrl"; // ✅ 백엔드 API 주소

// ✅ 크롬 익스텐션 설치 이벤트 리스너 등록
chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 크롬 익스텐션 설치됨!");

    // ✅ 웹사이트 이동 전에 도박 사이트 필터링 (백엔드 URL 차단)
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
                        console.log("📦 Storage 값 가져옴:", result);
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
                    const hostname = new URL(url).hostname; // 예: `https://ct8855.com/sdfasdf` → `ct8855.com`
                    return hostname.replace(/^www\./, ""); // `www.` 제거
                } catch (error) {
                    console.error("❌ URL 파싱 오류:", error);
                    return null;
                }
            };

            // ✅ 정리된 도메인 가져오기
            const domain = extractDomain(details.url);
            if (!domain) return;

            console.log(`🔍 도메인 검사 중: ${domain}`);

            // ✅ 백엔드로 도메인 전송하여 차단 여부 확인
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: domain })
            });

            const data = await response.json();

            if (data.resultData === true) { // ✅ 백엔드 차단 대상인 경우
                console.log(`🚨 차단된 사이트 감지 (백엔드): ${domain}`);
                chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") });
            } else {
                console.log(`✅ 안전한 사이트 (백엔드): ${domain}`);
            }
        } catch (error) {
            console.error("❌ URL 검사 중 오류 발생:", error);
        }
    }, { url: [{ schemes: ["http", "https"] }] });
});

// ✅ `isBlocked` 상태가 변경될 때 background.js가 즉시 반응하도록 설정
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.isBlocked) {
        console.log("🔄 차단 기능 상태 변경 감지: ", changes.isBlocked.newValue);
    }
});

// ✅ 탭이 새로 로드될 때 도박 관련 키워드 가중치 검사 추가 (백엔드와 별도)
//    이 로직은 페이지 내용에 포함된 키워드의 가중치 총합을 계산하여 임계치(threshold)를 넘으면 차단합니다.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          // 도박 관련 키워드와 각 키워드에 부여할 가중치
          const keywordWeights = {
            "카지노": 3,
            "미니게임": 1,
            "슬폿게임": 2,
            "입금신청": 2,
            "출금신청": 2,
            "배팅내역": 2,
            "텔레그램": 1,
            "지인추천": 1,
            "첫충전": 1,
            "스포츠": 2,
            "스페셜": 1,
            "페이백": 1,
            "머니내역": 1,
            "출석부": 1,
            "당첨금액": 2,
            "배팅금액": 2,
            "토근게임": 2,
            "충횟수": 1,
            "충금액": 1,
            "안전계좌": 1,
            "홀짝": 2,
            "파워사다리": 2,
            "로투스": 1,
            "벳365": 3,
            "바카라": 3,
            "가상스포츠": 2,
            "배팅한도": 1,
            "출금한도": 1,
            "배팅규정": 1,
            "두폴더": 1,
            "다폴처": 1,
            "축배팅": 1,
            "보험배팅": 1,
            "적중특례": 1,
            "크로스": 1,
            "양방": 1,
            "가입코드": 1,
            "가상게임": 1,
            "입금계좌": 1,
            "평생주소": 1,
            "평생도메인": 1,
            "라이브카지노": 3
          };

          // 임계치: 이 값을 넘어가면 키워드 기반 차단을 수행합니다.
          const threshold = 30;
          const pageText = document.body.innerText;
          let weightedScore = 0;
          for (const [keyword, weight] of Object.entries(keywordWeights)) {
            const regex = new RegExp(keyword, "gi");
            const matches = pageText.match(regex);
            if (matches) {
              weightedScore += matches.length * weight;
            }
          }
          console.log("Weighted Score:", weightedScore);
          if (weightedScore >= threshold) {
            // 키워드 기반 차단: blocked.html로 리디렉션
            window.location.href = chrome.runtime.getURL("blocked.html");
          }
          
          // 추가적으로 추출된 고유 단어 목록 반환 (디버깅용)
          const words = pageText.match(/[\wㄱ-ㅎ가-힣]+/g) || [];
          return Array.from(new Set(words));
        }
      }).then((injectionResults) => {
        injectionResults.forEach(frameResult => {
          console.log("추출된 키워드:", frameResult.result);
        });
      }).catch(err => {
        console.error("스크립트 실행 에러:", err);
      });
    }
});
