import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ProfileBubble from "../../features/creator/components/ProfileBubble";
import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
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
  const [guestName, setGuestName] = useState("");
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>캐릭터 선택</p>

      <ProfileBubble value={guestName} onChange={setGuestName} />
      <BottomActionSlot>
        <CommonLinkButton label="6. 링크 생성 완료로" to="/creator/complete" />
      </BottomActionSlot>
    </div>
  );
}
