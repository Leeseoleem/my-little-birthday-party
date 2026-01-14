import type { CakeType, CakeCandleLayout } from "../../types/cake.types";

export const CAKE_CANDLE_POSITIONS: Record<CakeType, CakeCandleLayout> = {
  party: {
    kind: "multiple",
    points: [
      { x: 314, y: 204 },
      { x: 394, y: 166.5 },
      { x: 474, y: 241.5 },
      { x: 544, y: 204 },
    ],
  },

  simple: {
    kind: "multiple",
    points: [
      { x: 295, y: 210 },
      { x: 375, y: 172.5 },
      { x: 455, y: 247.5 },
      { x: 525, y: 210 },
    ],
  },

  "choco-banana": {
    kind: "multiple",
    points: [
      { x: 315, y: 210 },
      { x: 395, y: 172.5 },
      { x: 475, y: 247.5 },
      { x: 545, y: 210 },
    ],
  },

  cheese: {
    kind: "multiple",
    points: [
      { x: 285, y: 284 },
      { x: 385, y: 226.5 },
      { x: 485, y: 341.5 },
      { x: 585, y: 284 },
    ],
  },

  "party-double": {
    kind: "single",
    point: {
      x: 437.5,
      y: 25,
    },
  },
};
