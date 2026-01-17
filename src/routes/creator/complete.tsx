import { createFileRoute } from "@tanstack/react-router";

import GarlandLayout from "../../components/layout/page/GarlandLayout";
import CreatorShareSection from "../../features/creator/components/complete/CreatorShareSection";
import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";

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
      <EnvelopeLayout />
      <div className="fixed inset-0 bg-black/4 backdrop-blur-[2px] z-5 pointer-events-none" />
      <div className="flex justify-center items-center">
        <div className="flex h-full py-8 mdh:py-16 lgh:py-25">
          <CreatorShareSection
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
