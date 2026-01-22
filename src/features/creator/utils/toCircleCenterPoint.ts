import type { CakeCandlePoint } from "../../types/cake.types";

export type AnchorPoint = { x: number; y: number };

/**
 * (x, y)가 원의 좌상단일 때,
 * scale을 고려한 원 중심 좌표로 변환
 *
 * @param p 원 좌상단 좌표 (원본 기준)
 * @param scale 현재 렌더 스케일
 * @param diameter 원본 기준 원 지름 (기본 25)
 */

const SLOT_DIAMETER = 25;
const SLOT_RADIUS = SLOT_DIAMETER / 2;

export function toCircleCenterPoint(slot: CakeCandlePoint) {
  return {
    x: slot.x + SLOT_RADIUS,
    y: slot.y + SLOT_RADIUS,
  };
}
