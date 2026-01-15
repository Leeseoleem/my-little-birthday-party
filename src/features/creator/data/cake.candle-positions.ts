import type { CakeType, CakeCandleLayout } from "../../types/cake.types";

export const CAKE_CANDLE_POSITIONS: Record<CakeType, CakeCandleLayout> = {
  party: {
    kind: "multiple",
    slots: [
      { key: "slot-1", x: 314, y: 204 },
      { key: "slot-2", x: 394, y: 166.5 },
      { key: "slot-3", x: 474, y: 241.5 },
      { key: "slot-4", x: 544, y: 204 },
    ],
  },

  simple: {
    kind: "multiple",
    slots: [
      { key: "slot-1", x: 295, y: 210 },
      { key: "slot-2", x: 390, y: 172.5 },
      { key: "slot-3", x: 485, y: 247.5 },
      { key: "slot-4", x: 570, y: 210 },
    ],
  },

  "choco-banana": {
    kind: "multiple",
    slots: [
      { key: "slot-1", x: 315, y: 210 },
      { key: "slot-2", x: 395, y: 172.5 },
      { key: "slot-3", x: 475, y: 247.5 },
      { key: "slot-4", x: 545, y: 210 },
    ],
  },

  cheese: {
    kind: "multiple",
    slots: [
      { key: "slot-1", x: 285, y: 284 },
      { key: "slot-2", x: 385, y: 226.5 },
      { key: "slot-3", x: 485, y: 341.5 },
      { key: "slot-4", x: 585, y: 284 },
    ],
  },

  "party-double": {
    kind: "single",
    slot: {
      key: "slot-1",
      x: 437.5,
      y: 25,
      label: "top-only",
    },
  },
};
