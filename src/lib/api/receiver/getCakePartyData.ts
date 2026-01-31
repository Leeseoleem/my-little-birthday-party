import { supabase } from "../../../lib/supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";

export type CakePartyData = {
  cake_type: string | null; // 예: "cheese"
  candles: unknown | null; // 예: jsonb (placedCandlesBySlot 등)
};

export async function getCakePartyData(cardId: string): Promise<CakePartyData> {
  const { data, error } = await supabase
    .from("cards")
    .select("cake_type, candles")
    .eq("id", cardId)
    .single();

  if (error) {
    throw new Error(`getCakePartyData: ${error.message}`);
  }

  if (!data) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  return {
    cake_type: data.cake_type ?? null,
    candles: data.candles ?? null,
  };
}
