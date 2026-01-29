import { createFileRoute, useNavigate } from "@tanstack/react-router";

import clsx from "clsx";
import { pageLayout } from "../../components/shared/styles/pageLayout";

// ----- 컴포넌트 -----
import InvitationCreateCard from "../../features/creator/components/info/InvitationCreateCard";
import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
import NoticeFrame from "../../components/layout/page/NoticeFrame";

// ----- 유틸 -----
import { ensureAnonSession } from "../../lib/auth/ensureAnonSession";
import {
  createCardDraft,
  type CreateCardDraftInput,
} from "../../lib/api/createCardDraft";

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
  const navigate = useNavigate();

  const [inviteeName, setInviteeName] = useState("");
  const [inviteeBirthDate, setInviteeBirthDate] = useState("");

  // 두 필드가 모두 올바르게 채워졌을 때만 활성화
  const isDisabled =
    !inviteeName.trim() || inviteeBirthDate.trim().length !== 4;

  // 로딩 / 에러 확인용 변수
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async (input: CreateCardDraftInput) => {
    setIsLoading(true);

    try {
      // 익명 session 발급
      await ensureAnonSession();

      const { cardId } = await createCardDraft(input);
      navigate({
        to: "/creator/letter",
        search: { cardId },
        replace: true,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(pageLayout, "gap-6")}>
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
            isDisabled: isDisabled || isLoading,
            label: isLoading ? "처리 중..." : "시작하기",
            onClick: () => {
              void handleNext({
                receiver_name: inviteeName,
                pin_birth: inviteeBirthDate,
              });
            },
          }}
        />
      </BottomActionSlot>
    </div>
  );
}
