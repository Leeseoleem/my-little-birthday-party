import { useEffect } from "react";

interface BeforeUnloadWarningOptions {
  /**
   * 새로고침 방지 조건(boolean 값)
   */
  when: boolean;
}

export function useBeforeUnloadWarning({ when }: BeforeUnloadWarningOptions) {
  useEffect(() => {
    if (!when) return;

    const handler = (e: BeforeUnloadEvent) => {
      // 표준: preventDefault + returnValue 설정 시 경고 다이얼로그 트리거
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [when]);
}
