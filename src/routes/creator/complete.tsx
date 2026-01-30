import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import clsx from "clsx";

import { getCardInviteInfo } from "../../lib/api/getCardInviteInfo";
import { formatPinBirth } from "../../utils/formatPinBirth";
import { completeCard } from "../../lib/api/completeCard";

import { copyShareLink } from "../../features/creator/utils/copyShareLink";
import { shareKakao } from "../../lib/share/shareKakao";

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
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const { invite } = loaderData;

    const title = `${invite.receiverName}님을 위한 생일 파티 초대장 🎉`;
    const description = `${invite.receiverName}님을 특별한 생일 파티에 초대했어요.`;

    return {
      title,
      meta: [
        { name: "description", content: description },

        { property: "og:title", content: title },
        { property: "og:description", content: description },

        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },

  component: CreatorCompletePage,
});

function CreatorCompletePage() {
  const { cardId, invite } = Route.useLoaderData();

  // ===== 링크 복사하기 =====
  async function handleCopyLink() {
    try {
      await copyShareLink(cardId);
      alert("링크를 복사했습니다.");
    } catch (err) {
      console.error("[copyShareLink] failed:", err);
      alert("링크 복사에 실패했습니다.");
    }
  }

  // ===== 카카오톡 공유하기 =====
  const [isSharing, setIsSharing] = useState(false);

  async function handleShareKakao() {
    if (isSharing) return;

    try {
      setIsSharing(true);

      await shareKakao(cardId, {
        receiverName: invite.receiverName,
      });

      // 성공 토스트가 있으면 여기서 띄우면 됨(현재는 생략)
    } catch (err) {
      console.error("[shareKakao] failed:", err);
      alert("카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSharing(false);
    }
  }

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
              onShareKakao: handleShareKakao,
              onCopyLink: handleCopyLink,
            }}
          />
        </div>
      </div>
    </GarlandLayout>
  );
}
