import { supabase } from "../supabase";
import type { CardRow } from "../../types/cards.types";
import type { CardIdResult } from "../../types/cardResult.types";
import { CARD_ERROR } from "../../errors/cardErrorCodes";
import type { LetterDoc } from "../../features/types/letterPaper.types";
import type { CreatorLastStep } from "../../features/types/creatorFlowStep.types";

type SaveLetterDocPayload = Pick<
  CardRow,
  "letter_paper_type" | "letter" | "last_step"
>;

export async function saveLetterDoc(
  cardId: CardRow["id"] | undefined,
  doc: LetterDoc,
  lastStep: CreatorLastStep = "c3_letter",
): Promise<CardIdResult> {
  // cardId 유실 검증
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  // doc 검증
  if (!doc) {
    throw new Error("saveLetterDoc: doc이 비어있습니다.");
  }

  // 입력값 검증: paperType/content
  if (!doc.paperType) {
    throw new Error("편지지가 선택되지 않았습니다.");
  }
  if (typeof doc.content !== "string") {
    throw new Error("편지 내용이 작성되지 않았습니다.");
  }

  const payload: SaveLetterDocPayload = {
    letter_paper_type: doc.paperType,
    letter: doc.content,
    last_step: lastStep,
  };

  const { error } = await supabase
    .from("cards")
    .update(payload)
    .eq("id", cardId);

  if (error) {
    throw new Error(`saveLetterDoc: ${error.message}`);
  }

  return { cardId };
}
