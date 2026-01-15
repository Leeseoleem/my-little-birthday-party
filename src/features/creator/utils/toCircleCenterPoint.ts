import type { CakeCandlePoint } from "../../types/cake.types";

export type AnchorPoint = { x: number; y: number };

/**
 * (x, y)가 원의 좌상단일 때,
 * 원 중심 좌표로 변환하는 함수
 */
export function toCircleCenterPoint(p: CakeCandlePoint): AnchorPoint {
  return {
    x: p.x + 12.5,
    y: p.y + 12.5,
  };
}
