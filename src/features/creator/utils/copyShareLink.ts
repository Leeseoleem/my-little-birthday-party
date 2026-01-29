import { getShareUrl } from "../../../utils/getShareUrl";

/**
 * 카드 공유 링크를 클립보드에 복사합니다.
 *
 * @param cardId - 공유할 카드의 고유 ID
 */
export async function copyShareLink(cardId: string | undefined): Promise<void> {
  if (!cardId) {
    throw new Error("copyShareLink: cardId가 없습니다.");
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
