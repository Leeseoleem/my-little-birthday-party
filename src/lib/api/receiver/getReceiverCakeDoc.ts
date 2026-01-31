import { supabase } from "../../supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";

import type { CakeType } from "../../../features/types/cake.types";
import type { PlacedCandlesBySlot } from "../../../features/types/cake-doc.types";

export type ReceiverCakeDoc = {
  cakeType: CakeType;
  candles: PlacedCandlesBySlot;
};

// RPC가 반환하는 row shape (DB snake_case)
type ReceiverCakeDocRow = {
  cake_type: string | null;
  candles: unknown | null;
};

export async function getReceiverCakeDoc(
  cardId: string,
): Promise<ReceiverCakeDoc> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const { data, error } = await supabase.rpc("get_receiver_cake_doc", {
    p_card_id: cardId,
  });

  if (error) {
    throw new Error(`getReceiverCakeDoc: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : data;

  if (!row) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }
  const r = row as ReceiverCakeDocRow;

  const cakeType = (r.cake_type ?? "party") as CakeType;
  const candles = (r.candles ?? {}) as PlacedCandlesBySlot;

  return { cakeType, candles };
}
