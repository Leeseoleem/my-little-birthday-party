import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";

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
  component: CreatorCompletePage,
});

function CreatorCompletePage() {
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
              onCopyLink: () => {
                // TODO: navigator.clipboard.writeText(url)
              },
            }}
          />
        </div>
      </div>
    </GarlandLayout>
  );
}
