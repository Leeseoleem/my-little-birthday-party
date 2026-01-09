import { createFileRoute } from "@tanstack/react-router";

// ----- 컴포넌트 -----
import InvitationCreateCard from "../../features/creator/components/InvitationCreateCard";
import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
import NoticeFrame from "../../components/layout/page/NoticeFrame";

// ----- 유틸 -----
import { openInNewTab } from "../../utils/openInNewTab";

// ----- 데이터 -----
import { segments } from "../../features/creator/data/segments.data";
import { useState } from "react";

export const Route = createFileRoute("/creator/info")({
  staticData: {
    creatorHeader: {
      kind: "back",
    },
  },
  component: CreatorInfoPage,
});

function CreatorInfoPage() {
  const [inviteeName, setInviteeName] = useState("");
  const [inviteeBirthDate, setInviteeBirthDate] = useState("");

  // 두 필드가 모두 채워졌을 때만 활성화
  const isDisabled = !inviteeName.trim() || !inviteeBirthDate.trim();

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex-1 flex items-center justify-center">
        <InvitationCreateCard
          nameField={{
            value: inviteeName,
            onChange: setInviteeName,
            placeholder: "ex) 돌쇠",
            maxLength: 10,
          }}
          birthDateField={{
            id: "birthDate",
            value: inviteeBirthDate,
            onChange: setInviteeBirthDate,
          }}
        />
      </div>
      <BottomActionSlot>
        <NoticeFrame
          type="default"
          segments={segments}
          buttonProps={{
            isDisabled: isDisabled,
            label: "시작하기",
            onClick: () => openInNewTab("/creator/letter"),
          }}
        />
      </BottomActionSlot>
    </div>
  );
}
