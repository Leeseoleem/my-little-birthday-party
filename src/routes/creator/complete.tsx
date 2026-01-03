import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

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
    <div className="flex flex-1 flex-col justify-center">
      <p>링크 생성 완료</p>
      <BottomActionSlot>
        <CommonLinkButton label="처음으로" to="/creator" />
      </BottomActionSlot>
    </div>
  );
}
