import { supabase } from "../../supabase";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";
import type { CardRow } from "../../../types/cards.types";

// UUID v4/v1 등 일반 UUID 형식 검사
function isUuid(value: string): boolean {
  // 8-4-4-4-12 형태(대소문자 허용)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}

/**
 * RPC: get_receiver_card_status 반환 row 타입
 */
export type ReceiverCardStatusRow = Pick<
  CardRow,
  "is_opened" | "receiver_name" | "status" | "is_completed"
> & {
  card_exists: boolean;
};

/**
 * 수신자 진입: 카드 상태 확인
 * - 카드가 없으면 null 반환
 */
export async function getReceiverCardStatus(
  cardId: CardRow["id"] | undefined,
): Promise<ReceiverCardStatusRow | null> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  if (!isUuid(cardId)) {
    return null;
  }

  const { data, error } = await supabase.rpc("get_receiver_card_status", {
    p_card_id: cardId,
  });

  if (error) {
    throw new Error(`getReceiverCardStatus: ${error.message}`);
  }

  // RPC 반환이 배열로 오는 케이스를 방어
  const row = Array.isArray(data) ? data[0] : data;

  // 카드가 없으면 row 자체가 없음(0 row)
  if (!row) return null;

  return row as ReceiverCardStatusRow;
}

export type VerifyPinResult = {
  ok: boolean;
  invitee_name: string | null;
  invitee_birth_mmdd: string | null;
};

/**
 * PIN 검증 + 초대 정보 조회
 */
export async function verifyPinAndGetInviteInfo(
  cardId: CardRow["id"] | undefined,
  pin: string,
): Promise<VerifyPinResult | null> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  const trimmed = pin.trim();

  // 클라에서 1차 형식 검증(서버 부하 줄이고 UX 개선)
  // "1014" 같이 4자리 숫자만 허용
  if (!/^\d{4}$/.test(trimmed)) {
    return { ok: false, invitee_name: null, invitee_birth_mmdd: null };
  }

  const { data, error } = await supabase.rpc("verify_pin_and_get_invite_info", {
    p_card_id: cardId,
    p_pin: trimmed,
  });

  if (error) {
    throw new Error(`verifyPinAndGetInviteInfo: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : data;

  if (!row) return { ok: false, invitee_name: null, invitee_birth_mmdd: null };
  return row as VerifyPinResult;

  return row as VerifyPinResult;
}
