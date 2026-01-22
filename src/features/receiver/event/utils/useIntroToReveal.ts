import { useEffect } from "react";
import type { CakeEventPhase } from "../types/cakeEventPhase.types";

// intro 안내 문구 노출 시간 (약 15초)
const INTRO_GUIDE_DURATION_MS = 5700;

/**
 * intro 단계에서만 실행되는 전환 로직
 * - 약 15초 후 reveal 단계로 이동
 * - cleanup을 통해 타이머 누수 방지
 */
export function useIntroToReveal(
  phase: CakeEventPhase,
  setPhase: (p: CakeEventPhase) => void,
) {
  useEffect(() => {
    // intro 단계가 아니면 아무 것도 하지 않음
    if (phase !== "intro") return;

    const timerId = setTimeout(() => {
      setPhase("reveal");
    }, INTRO_GUIDE_DURATION_MS);

    // phase가 바뀌거나 페이지가 언마운트되면 타이머 정리
    return () => {
      clearTimeout(timerId);
    };
  }, [phase, setPhase]);
}
