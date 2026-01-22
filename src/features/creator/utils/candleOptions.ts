import {
  LONG_CANDLE_OPTIONS,
  SHORT_CANDLE_OPTIONS,
  SPECIAL_CANDLE_OPTIONS,
} from "../data/candleOption.data";
import type { CandleType } from "../../types/candle.types";

const CANDLE_OPTIONS = [
  ...LONG_CANDLE_OPTIONS,
  ...SHORT_CANDLE_OPTIONS,
  ...SPECIAL_CANDLE_OPTIONS,
];

/**
 * candle id로 imageSrc를 찾는 함수
 * - 못 찾으면 null 반환
 */
export function getCandleImageSrcById(id: string): string | null {
  const found = CANDLE_OPTIONS.find((c) => c.id === id);
  return found ? found.imageSrc : null;
}

/**
 * candle id로 type 찾는 함수
 * - 못 찾으면 null 반환
 */
export function getCandleTypeById(id: string): CandleType | null {
  const found = CANDLE_OPTIONS.find((c) => c.id === id);
  return found?.type ?? null;
}
