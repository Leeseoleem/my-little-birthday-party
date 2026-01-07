import { createFileRoute } from "@tanstack/react-router";

import GarlandLayout from "../../components/layout/page/GarlandLayout";
import CreatorShareSection from "../../features/creator/components/CreatorShareSection";

export const Route = createFileRoute("/creator/complete")({
  staticData: {
    creatorLayout: {
      isFullBleed: true,
    },
  },
  component: CreatorCompletePage,
});

function CreatorCompletePage() {
  return (
    <GarlandLayout>
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="flex flex-1 min-h-full items-center justify-center py-12 md:py-18 lg:py-25">
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
