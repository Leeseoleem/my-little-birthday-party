import { getShareUrl } from "../../../utils/getShareUrl";
import { CARD_ERROR } from "../../../errors/cardErrorCodes";

/**
 * 카드 공유 링크를 클립보드에 복사합니다.
 *
 * @param cardId - 공유할 카드의 고유 ID
 */
export async function copyShareLink(cardId: string | undefined): Promise<void> {
  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    throw new Error("Clipboard API를 사용할 수 없습니다.");
  }

  try {
    const url = getShareUrl(cardId);
    await navigator.clipboard.writeText(url);
  } catch (err) {
    if (err instanceof Error) {
      console.error("copyShareLink error:", err.message, err);
    } else {
      console.error("copyShareLink unknown error:", err);
    }
    throw err;
  }
}
