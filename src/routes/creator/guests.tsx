import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/guests")({
  staticData: {
    creatorHeader: {
      value: 1.0,
      fallbackTo: "/creator/cake/build",
    },
  },
  component: CreatorGuestSelectPage,
});

function CreatorGuestSelectPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>캐릭터 선택</p>
      <BottomActionSlot>
        <CommonLinkButton label="6. 링크 생성 완료로" to="/creator/complete" />
      </BottomActionSlot>
    </div>
  );
}
