import { useRef } from "react";
import { useAnimationControls } from "framer-motion";

/**
 * 한계 도달 시 사용자 피드백 제공 훅
 * - ref 기반 중복 실행 방지
 * - framer-motion animation controls 제어
 * - 브라우저 진동 API
 * - 비동기 애니메이션 흐름 관리
 */

export const useLimitFeedback = () => {
  const controls = useAnimationControls();
  const feedbackLockRef = useRef(false);

  const triggerLimitFeedback = async () => {
    // 중복 실행 방지
    if (feedbackLockRef.current) return;
    feedbackLockRef.current = true;

    // 이전 애니메이션 중단
    controls.stop();

    // 흔들림 애니메이션 실행
    await controls.start({
      x: [0, -6, 6, -4, 4, 0],
      transition: { duration: 0.18 },
    });

    // 모바일 진동 피드백
    if ("vibrate" in navigator) {
      navigator.vibrate(25);
    }

    // 락 해제
    setTimeout(() => {
      feedbackLockRef.current = false;
    }, 200);
  };

  return {
    controls,
    triggerLimitFeedback,
  };
};
