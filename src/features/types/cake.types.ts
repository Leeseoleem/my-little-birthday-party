export type CakeType =
  | "party"
  | "party-double"
  | "simple"
  | "cheese"
  | "choco-banana";

export type CakeMenuItem = {
  type: CakeType;
  imageSrc: string;
  menuName: string;
  description: string;
};

/**
 * 좌표 규칙 (중요)
 * - x, y는 모두 "원의 좌상단(left, top)" 기준 px
 * - 원 지름은 25px
 * - 기준 가로 폭은 900px
 */
export type CakeCandlePoint = {
  x: number; // left 기준 px (0 ~ 900)
  y: number; // top 기준 px
};

export type CakeCandleLayout =
  | {
      kind: "multiple";
      points: CakeCandlePoint[]; // 보통 4개
    }
  | {
      kind: "single";
      point: CakeCandlePoint; // 2단 케이크
    };
