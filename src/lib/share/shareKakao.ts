import { ensureKakaoInitialized } from "./kakao";

import { toAbsoluteUrl } from "../../components/seo/seo.utils";
import { getSiteOrigin } from "../../utils/getSiteOrigin";
import { getShareUrl } from "../../utils/getShareUrl";
import { CARD_ERROR } from "../../errors/cardErrorCodes";

const DEFAULT_OG_IMAGE_PATH = "/og/og-birthday-card.png";

type ShareKakaoOptions = {
  receiverName?: string;
  description?: string;
  serverCallbackArgs?: Record<string, string>;
};

export async function shareKakao(
  cardId: string | undefined,
  options?: ShareKakaoOptions,
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("브라우저 환경에서만 공유할 수 있습니다.");
  }

  if (!cardId) {
    throw new Error(CARD_ERROR.CARD_ID_MISSING);
  }

  // Kakao SDK 로드 + init 보장
  await ensureKakaoInitialized();

  if (!window.Kakao) {
    throw new Error("Kakao SDK가 준비되지 않았습니다.");
  }

  const shareUrl = getShareUrl(cardId);

  const receiverName = options?.receiverName?.trim();
  const title = receiverName
    ? `${receiverName}님의 생일 파티 초대장`
    : "생일 파티 초대장";

  const description =
    options?.description?.trim() ?? "초대받은 링크를 열어 파티를 즐겨주세요.";

  const origin = getSiteOrigin();
  const imageUrl = toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH, origin);

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "초대장 열기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
}
