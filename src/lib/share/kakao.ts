/* ===== Kakao SDK 최소 타입 정의 ===== */

interface KakaoShare {
  sendDefault: (options: unknown) => void;
}

interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShare;
}

/**
 * Kakao SDK는 window.Kakao 형태로 주입되므로
 * TypeScript 전역 Window 타입을 확장한다.
 */
declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

// Kakao JavaScript SDK의 공식 스크립트 URL
const KAKAO_SDK_SRC = "https://developers.kakao.com/sdk/js/kakao.js";

let loadingPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Kakao) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${KAKAO_SDK_SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Kakao SDK 로드 실패")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Kakao SDK 로드 실패"));

    document.head.appendChild(script);
  });

  return loadingPromise;
}

/**
 * Kakao SDK 사용을 위한 초기화 보장 함수
 * - SDK 로드
 * - Kakao.init() 단 한 번만 실행
 */
export async function ensureKakaoInitialized(): Promise<void> {
  const jsKey = (
    import.meta.env.VITE_KAKAO_JS_KEY as string | undefined
  )?.trim();

  if (!jsKey) {
    throw new Error("VITE_KAKAO_JS_KEY가 설정되지 않았습니다.");
  }

  await loadKakaoSdk();

  if (!window.Kakao) {
    throw new Error("Kakao SDK가 window에 로드되지 않았습니다.");
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(jsKey);
  }
}
