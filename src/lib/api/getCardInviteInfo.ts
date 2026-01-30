import { supabase } from "../supabase";
import { CARD_ERROR } from "../../errors/cardErrorCodes";

type GetCardInviteInfoResult = {
  receiverName: string;
  pinBirth: string;
};

export async function getCardInviteInfo(
  cardId: string,
): Promise<GetCardInviteInfoResult> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }
  // cards 테이블에서 초대할 사람의 정보 컬럼을 반환
  const { data, error } = await supabase
    .from("cards")
    .select("receiver_name, pin_birth")
    .eq("id", cardId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("카드 정보를 찾을 수 없습니다.");

  return {
    receiverName: data.receiver_name,
    pinBirth: data.pin_birth,
  };
}
