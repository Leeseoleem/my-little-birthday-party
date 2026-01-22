import { useNavigate } from "@tanstack/react-router";

import InvitationCardFrame from "../../../components/shared/invitation/InvitationCardFrame";
import type { InvitationInfoProps } from "../../../components/shared/invitation/InvitationInfo";
import InvitationGuide from "../../../components/shared/invitation/InvitationGuide";
import CommonButton from "../../../components/ui/Button/Button";

import { useAudioUnlock } from "../../../hooks/useAudioUnlock";

export default function InvitationPreviewCard({
  info,
}: {
  info: InvitationInfoProps;
}) {
  const navigate = useNavigate();
  const { unlock } = useAudioUnlock();

  const handleEnter = async () => {
    // 사용자 제스처(버튼 클릭) 안에서 언락 시도
    // 성공/실패와 무관하게 다음 화면으로 이동하도록 구성
    await unlock();

    navigate({
      to: "/r/$cardId/event",
      params: { cardId: "demo" },
      replace: true,
    });
  };

  return (
    <InvitationCardFrame info={info}>
      <InvitationGuide variant="receiver" />
      <div className="w-full flex justify-center">
        <CommonButton label="입장하기" onClick={handleEnter} />
      </div>
    </InvitationCardFrame>
  );
}
