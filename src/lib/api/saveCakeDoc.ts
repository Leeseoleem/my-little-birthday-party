import { supabase } from "../supabase";
import type { CardRow } from "../../types/cards.types";
import type { CardIdResult } from "../../types/cardResult.types";
import { CARD_ERROR } from "../../errors/cardErrorCodes";
import type {
  CakeDoc,
  PlacedCandlesBySlot,
} from "../../features/types/cake-doc.types";
import type { CreatorLastStep } from "../../features/types/creatorFlowStep.types";
import type { CakeType } from "../../features/types/cake.types";

type SaveCakeDocPayload = Pick<CardRow, "cake_type" | "candles" | "last_step">;

/**
 * 슬롯 개수 규칙:
 * - simple: 1개
 * - others: 1~4개
 */
function validateSlotCount(cakeType: CakeType, placed: PlacedCandlesBySlot) {
  const slotCount = Object.keys(placed).length;

  if (cakeType === "simple") {
    if (slotCount !== 1) {
      throw new Error("simple 케이크는 슬롯이 1개여야 합니다.");
    }
    return;
  }

  if (slotCount < 1 || slotCount > 4) {
    throw new Error("케이크 촛불 슬롯은 1~4개여야 합니다.");
  }
}

export async function saveCakeDoc(
  cardId: CardRow["id"] | undefined,
  doc: CakeDoc,
  lastStep: CreatorLastStep = "c5_cake_build",
): Promise<CardIdResult> {
  // cardId 유실 검증
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  // doc 검증
  if (!doc) {
    throw new Error("saveCakeDoc: doc이 비어있습니다.");
  }

  // 입력값 검증: cakeType / placedCandlesBySlot
  if (!doc.cakeType) {
    throw new Error("케이크 타입이 선택되지 않았습니다.");
  }

  if (!doc.placedCandlesBySlot || typeof doc.placedCandlesBySlot !== "object") {
    throw new Error("촛불이 배치되지 않았습니다.");
  }

  const placedCount = Object.values(doc.placedCandlesBySlot).filter(
    (v) => v !== null,
  ).length;

  if (placedCount === 0) {
    throw new Error("촛불이 배치되지 않았습니다.");
  }

  // 슬롯 개수 규칙(앱 레벨 1차 방어)
  validateSlotCount(doc.cakeType, doc.placedCandlesBySlot);

  const payload: SaveCakeDocPayload = {
    cake_type: doc.cakeType,
    candles: doc.placedCandlesBySlot, // jsonb에 object 그대로 저장
    last_step: lastStep,
  };

  const { data, error } = await supabase
    .from("cards")
    .update(payload)
    .eq("id", cardId)
    .select("id");

  if (error) {
    throw new Error(`saveCakeDoc: ${error.message}`);
  }

  if (!data || data.length === 0) {
    // 존재하지 않거나, RLS/권한 문제로 업데이트 대상 row가 "보이지/허용되지" 않아 0건일 수도 있음
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  return { cardId };
}
