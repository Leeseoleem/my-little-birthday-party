import {
  LONG_CANDLE_OPTIONS,
  SHORT_CANDLE_OPTIONS,
  SPECIAL_CANDLE_OPTIONS,
} from "../data/candleOption.data";

/**
 * candle id로 imageSrc를 찾는 함수
 * - 못 찾으면 null 반환
 */
export function getCandleImageSrcById(id: string): string | null {
  const all = [
    ...LONG_CANDLE_OPTIONS,
    ...SHORT_CANDLE_OPTIONS,
    ...SPECIAL_CANDLE_OPTIONS,
  ];

  const found = all.find((c) => c.id === id);
  return found ? found.imageSrc : null;
}
