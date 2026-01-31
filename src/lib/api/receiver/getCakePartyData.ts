import { supabase } from "../../../lib/supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";
import type { CakeType } from "../../../features/types/cake.types";

export type CakePartyData = {
  cake_type: CakeType | null; // 예: "cheese"
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
  };
}
