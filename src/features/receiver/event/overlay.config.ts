import type { CakeEventPhase } from "./types/cakeEventPhase.types";

/**
 * 오버레이 연출 기준값
 * - intro: 완전 암전(1)
 * - reveal: 1에서 목표값으로 서서히 감소
 * - readyToBlow: reveal 종료값 유지(긴장감 유지)
 * - blown: 빠르게 0으로 감소(불 켜짐 느낌)
 * - done: 0 유지
 */
export const OVERLAY_OPACITY: Record<CakeEventPhase, number> = {
  intro: 1,
  reveal: 0.45,
  readyToBlow: 0.45,
  blown: 0,
  done: 0,
} as const;

/**
 * phase별 transition(시간/속도) 설정
 * - reveal: 느리게(케이크가 드러나는 연출)
 * - blown: 빠르게(불 켜짐 느낌)
 * - 나머지: 즉시 고정(transition 없음)
 */
export type OverlayTransition = {
  durationMs: number; // 화면 변환 시간초
  easing: string; // 변화 속도
};

export const OVERLAY_TRANSITION: Record<CakeEventPhase, OverlayTransition> = {
  intro: { durationMs: 0, easing: "linear" },
  reveal: { durationMs: 1300, easing: "ease-out" },
  readyToBlow: { durationMs: 0, easing: "linear" },
  blown: { durationMs: 300, easing: "linear" },
  done: { durationMs: 0, easing: "linear" },
} as const;

/**
 * 현재 phase에 맞는 inline style을 만들어주는 헬퍼
 * - 오버레이는 시각 연출 전용이므로 pointer-events를 막아 터치가 먹지 않도록 함
 */
export function getOverlayStyle(phase: CakeEventPhase): React.CSSProperties {
  const targetOpacity = OVERLAY_OPACITY[phase];
  const { durationMs, easing } = OVERLAY_TRANSITION[phase];

  return {
    opacity: targetOpacity,
    transition: durationMs > 0 ? `opacity ${durationMs}ms ${easing}` : "none",
    pointerEvents: "none",
  };
}
