import InvitationCardFrame from "../../../components/shared/invitation/InvitationCardFrame";
import type { InvitationInfoProps } from "../../../components/shared/invitation/InvitationInfo";
import InvitationGuide from "../../../components/shared/invitation/InvitationGuide";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export default function InvitationPreviewCard({
  info,
}: {
  info: InvitationInfoProps;
}) {
  return (
    <InvitationCardFrame info={info}>
      <InvitationGuide variant="receiver" />
      <div className="w-full flex justify-center">
        <CommonLinkButton label="입장하기" to="/r/$cardId/event" />
      </div>
    </InvitationCardFrame>
  );
}
