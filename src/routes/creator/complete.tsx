import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import clsx from "clsx";

import { completeCard } from "../../lib/api/completeCard";
import { handleCardError } from "../../errors/handleCardError";

import { copyShareLink } from "../../features/creator/utils/copyShareLink";

import GarlandLayout from "../../components/layout/page/GarlandLayout";
import InvitationCompleteCard from "../../features/creator/components/complete/InvitationCompleteCard";
import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";
import { receiverPageLayout } from "../../components/shared/styles/pageLayout";

export const Route = createFileRoute("/creator/complete")({
  staticData: {
    creatorHeader: {
      kind: "close",
    },
    creatorLayout: {
      isFullBleed: true,
    },
  },
  validateSearch: (search) => {
    return {
      cardId: typeof search.cardId === "string" ? search.cardId : undefined,
    };
  },
  component: CreatorCompletePage,
});

function CreatorCompletePage() {
  const navigate = useNavigate();
  const { cardId } = Route.useSearch();

  useEffect(() => {
    void (async () => {
      try {
        await completeCard(cardId);
      } catch (err) {
        const handled = handleCardError(err, navigate);
        if (handled) return;
        alert("저장 중 오류가 발생했습니다.");
      }
    })();
  }, [cardId, navigate]);

  return (
    <GarlandLayout hasHeader>
      <div className={clsx(receiverPageLayout, "px-4")}>
        <EnvelopeLayout />
        <div className="fixed inset-0 bg-black/4 z-5 pointer-events-none" />
        <div className="flex my-auto justify-center py-8 mdh:py-16 lgh:py-25">
          <InvitationCompleteCard
            info={{
              inviteeName: "이서림",
              inviteeBirthDate: "10-14",
            }}
            sns={{
              onShareKakao: () => {
                // TODO: Kakao SDK 연동 로직
              },
              onShareMail: () => {
                // TODO:  mailto 생성 로직
              },
              onCopyLink: async () => {
                try {
                  await copyShareLink(cardId);
                  alert("링크가 복사되었습니다");
                } catch {
                  alert("링크 복사에 실패했습니다");
                }
              },
            }}
          />
        </div>
      </div>
    </GarlandLayout>
  );
}
