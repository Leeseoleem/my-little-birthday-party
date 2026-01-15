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
 * 각 촛불 슬롯의 고유 식별자
 * - 저장 / 교체 / 삭제 / 렌더의 기준이 됨
 */
export type CandleSlotKey = string;

export type CakeCandlePoint = {
  x: number; // 원의 left 기준 px (0 ~ 900)
  y: number; // 원의 top 기준 px
};

/**
 * 단일 슬롯 좌표 정의
 * (좌표는 900px 기준, 촛불 bottom-anchor 기준)
 */
export type CakeCandleSlot = CakeCandlePoint & {
  key: CandleSlotKey; // 예: "slot-1", "slot-2" ...
  label?: string; // 디버깅/기획용(선택)
};

// 각 슬롯 별 z-index
export const PARTY_Z_ORDER: Record<string, number> = {
  "slot-3": 4,
  "slot-4": 3,
  "slot-1": 2,
  "slot-2": 1,
};

/**
 * 케이크별 촛불 레이아웃
 */
export type CakeCandleLayout =
  | {
      kind: "single";
      slot: CakeCandleSlot;
    }
  | {
      kind: "multiple";
      slots: CakeCandleSlot[];
    };
