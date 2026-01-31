import { supabase } from "../../supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";

import type {
  LetterPaperType,
  LetterDoc,
} from "../../../features/types/letterPaper.types";

type ReceiverLetterRow = {
  letter_paper_type: string | null;
  letter: string | null;
};

export async function getReceiverLetterDoc(cardId: string): Promise<LetterDoc> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const { data, error } = await supabase.rpc("get_receiver_letter_doc", {
    p_card_id: cardId,
  });

  if (error) {
    throw new Error(`getReceiverLetterDoc: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : data;

  if (!row) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const r = row as ReceiverLetterRow;

  const paperType = (r.letter_paper_type ?? "default") as LetterPaperType;
  const content = r.letter ?? "";

  return { paperType, content };
}
