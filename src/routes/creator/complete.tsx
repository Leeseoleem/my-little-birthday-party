import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import clsx from "clsx";

import { getCardInviteInfo } from "../../lib/api/getCardInviteInfo";
import { formatPinBirth } from "../../utils/formatPinBirth";
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
  loaderDeps: ({ search }) => ({
    cardId: search.cardId,
  }),
  loader: async ({ deps }) => {
    const { cardId } = deps;

    if (!cardId) {
      // loader 안에서는 navigate 대신 redirect를 throw 합니다.
      throw redirect({ to: "/creator" });
    }

    await completeCard(cardId);
    const invite = await getCardInviteInfo(cardId);

    return { cardId, invite };
  },
  component: CreatorCompletePage,
});

function CreatorCompletePage() {
  const navigate = useNavigate();
  const { cardId, invite } = Route.useLoaderData();

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
              inviteeName: invite.receiverName,
              inviteeBirthDate: formatPinBirth(invite.pinBirth),
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
