export const CARD_ERROR = {
  CARD_ID_MISSING: "CARD_ID_MISSING",
} as const;

export type CardErrorCode = (typeof CARD_ERROR)[keyof typeof CARD_ERROR];
