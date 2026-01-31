import { supabase } from "../../../lib/supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";

/**
 * 파티 페이지 최초 도달 시:
 * - opened_at이 null이면 현재 시각으로 기록
 * - is_opened를 true로 확정
 *
 * 주의:
 * - opened_at이 이미 있으면(재접속) 아무 일도 일어나지 않음
 * - cardId가 없거나 잘못되면 count로 감지
 */
export async function markCardOpened(cardId: string) {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("cards")
    .update({
      is_opened: true,
      opened_at: nowIso,
    })
    .eq("id", cardId)
    .is("opened_at", null)
    .select("id");

  if (error) {
    throw new Error(`markCardOpened: ${error.message}`);
  }

  // 업데이트된 행이 0개면:
  // (A) 이미 opened_at이 존재(재접속) 또는 (B) cardId 자체가 없음
  if (!data || data.length === 0) {
    const { data: exists, error: existsError } = await supabase
      .from("cards")
      .select("id")
      .eq("id", cardId)
      .maybeSingle();

    if (existsError) throw new Error(existsError.message);
    if (!exists) throw new Error(CARD_ERROR.CARD_ID_MISSING);

    // exists면 "이미 opened" 케이스
    return { updated: false };
  }

  return { updated: true };
}
