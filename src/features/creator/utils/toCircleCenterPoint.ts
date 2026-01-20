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
export function toCircleCenterPoint(
  p: CakeCandlePoint,
  scale: number,
  diameter = 25,
): AnchorPoint {
  const radius = (diameter / 2) * scale;

  return {
    x: p.x + radius,
    y: p.y + radius,
  };
}
