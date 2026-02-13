import { getSiteOrigin } from "./getSiteOrigin";
import { CARD_ERROR } from "../errors/cardErrorCodes";

export function getShareUrl(cardId: string | undefined): string {
  if (!cardId) throw new Error(CARD_ERROR.CARD_ID_MISSING);

  if (typeof window === "undefined") {
    // 브라우저에서만 써야 하는 함수라 서버에서 호출되면 에러로 잡아두는 편이 안전
    throw new Error("getShareUrl은 브라우저 환경에서만 사용할 수 있습니다.");
  }

  const origin = getSiteOrigin();
  const encoded = encodeURIComponent(cardId);

  return `${origin}/share/${encoded}`;
}
