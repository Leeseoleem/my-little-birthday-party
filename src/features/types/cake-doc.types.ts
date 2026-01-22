import type { CakeType } from "./cake.types";

/**
 * 슬롯 키(slot-1, slot-2 ...)별로
 * 선택된 촛불 옵션 id 또는 null을 저장하는 DB 모델
 */
export type PlacedCandlesBySlot = Record<string, string | null>;

/**
 * 케이크 + 촛불 배치에 대한 DB 문서 타입
 */
export interface CakeDoc {
  cakeType: CakeType;
  placedCandlesBySlot: PlacedCandlesBySlot;
}
