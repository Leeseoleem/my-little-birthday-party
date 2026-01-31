import { useNavigate, useParams } from "@tanstack/react-router";

import InvitationCardFrame from "../../../components/shared/invitation/InvitationCardFrame";
import type { InvitationInfoProps } from "../../../components/shared/invitation/InvitationInfo";
import InvitationGuide from "../../../components/shared/invitation/InvitationGuide";
import CommonButton from "../../../components/ui/Button/Button";

export default function InvitationPreviewCard({
  info,
}: {
  info: InvitationInfoProps;
}) {
  const navigate = useNavigate();

  const { cardId } = useParams({ from: "/r/$cardId/" });

  const handleEnter = async () => {
    if (!cardId) {
      navigate({ to: "/r/expired" });
      return true;
    }

    navigate({
      to: "/r/$cardId/event",
      params: { cardId },
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
