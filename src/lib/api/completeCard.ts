import { supabase } from "../supabase";
import type { CardRow } from "../../types/cards.types";
import type { CardIdResult } from "../../types/cardResult.types";
import { CARD_ERROR } from "../../errors/cardErrorCodes";
import type { CreatorLastStep } from "../../features/types/creatorFlowStep.types";

type CompleteCardPayload = Pick<
  CardRow,
  "is_completed" | "completed_at" | "status" | "last_step"
>;

export async function completeCard(
  cardId: CardRow["id"] | undefined,
  lastStep: CreatorLastStep = "c6_complete",
): Promise<CardIdResult> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const payload: CompleteCardPayload = {
    is_completed: true,
    completed_at: new Date().toISOString(),
    status: "published",
    last_step: lastStep,
  };

  // idempotent 처리: 이미 완료된 row는 업데이트하지 않음
  const { error } = await supabase
    .from("cards")
    .update(payload)
    .eq("id", cardId)
    .eq("is_completed", false);

  if (error) {
    throw new Error(`completeCard: ${error.message}`);
  }

  return { cardId };
}
