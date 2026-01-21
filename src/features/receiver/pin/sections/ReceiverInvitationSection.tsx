import clsx from "clsx";

import type { InvitationInfoProps } from "../../../../components/shared/invitation/InvitationInfo";

import { receiverPageLayout } from "../../../../components/shared/styles/pageLayout";

import EnvelopeLayout from "../../../../components/layout/page/EnvelopeLayout";
import InvitationPreviewCard from "../InvitationPreviewCard";

export default function ReceiverInvitationSection({
  info,
}: {
  info: InvitationInfoProps;
}) {
  return (
    <div className={clsx(receiverPageLayout, "px-4")}>
      <EnvelopeLayout />
      <div className="fixed inset-0 bg-black/4 z-5 pointer-events-none" />
      <div className="flex my-auto justify-center py-8 mdh:py-16 lgh:py-25">
        <InvitationPreviewCard info={info} />
      </div>
    </div>
  );
}
