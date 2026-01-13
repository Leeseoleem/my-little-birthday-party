import type { CandleOption } from "../components/CandleOptionGroup";

export const LONG_CANDLE_OPTIONS: CandleOption[] = [
  {
    id: "long-01",
    label: "긴 초 1",
    imageSrc: "/assets/candles/large/candle-long-blue.png",
  },
  {
    id: "long-02",
    label: "긴 초 2",
    imageSrc: "/assets/candles/large/candle-long-red.png",
  },
  {
    id: "long-03",
    label: "긴 초 3",
    imageSrc: "/assets/candles/large/candle-long-yellow.png",
  },
];

export const SHORT_CANDLE_OPTIONS: CandleOption[] = [
  {
    id: "short-01",
    label: "짧은 초 1",
    imageSrc: "/assets/candles/small/candle-short-blue.png",
  },
  {
    id: "short-02",
    label: "짧은 초 2",
    imageSrc: "/assets/candles/small/candle-short-red.png",
  },
  {
    id: "short-03",
    label: "짧은 초 3",
    imageSrc: "/assets/candles/small/candle-short-yellow.png",
  },
];

export const SPECIAL_CANDLE_OPTIONS: CandleOption[] = [
  {
    id: "special-01",
    label: "별 모양 초",
    imageSrc: "/assets/candles/special/candle-point-star.png",
  },
  {
    id: "special-02",
    label: "하트 모양 초",
    imageSrc: "/assets/candles/special/candle-point-heart.png",
  },
];
