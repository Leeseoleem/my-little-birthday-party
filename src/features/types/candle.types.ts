export type CandleType = "long" | "short" | "special";

// 원본 촛불 이미지 기준(높이 830px)
// flameCenterTopPx: 이미지 상단에서 "불꽃 원 중심"까지 내려온 px
export const CANDLE_FLAME_META: Record<
  CandleType,
  {
    flameCenterTopPx: number;
    flameSizePx: number; // 원본 기준 불꽃 지름
  }
> = {
  long: { flameCenterTopPx: 220, flameSizePx: 100 },
  short: { flameCenterTopPx: 360, flameSizePx: 100 },
  special: { flameCenterTopPx: 0, flameSizePx: 100 },
};
