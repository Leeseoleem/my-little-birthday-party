import type { LinkProps } from "@tanstack/react-router";

// 컴포넌트
import InvitationCardFrame from "../../../../components/shared/invitation/InvitationCardFrame";
import type { InvitationInfoProps } from "../../../../components/shared/invitation/InvitationInfo";
import InvitationGuide from "../../../../components/shared/invitation/InvitationGuide";
import ShareButtons, {
  type ShareButtonsProps,
} from "../../../../components/shared/ShareButtons";
import CommonLinkButton from "../../../../components/ui/Button/CommonLinkButton";

type CreatorShareSectionProps = {
  info: InvitationInfoProps;
  sns: ShareButtonsProps;
} & Omit<LinkProps, "to" | "children" | "className">;

export default function CreatorShareSection({
  info,
  sns,
  ...linkProps
}: CreatorShareSectionProps) {
  return (
    <InvitationCardFrame info={info}>
      <InvitationGuide variant="creator" />
      <div className="flex w-full justify-center">
        <ShareButtons {...sns} />
      </div>
      <div className="flex flex-col w-full items-center text-center gap-2">
        <p className="text-letter-default-responsive text-gray-60">
          이제 남은 건, 전하는 것 뿐이에요
        </p>
        <div className="w-full flex justify-center">
          <CommonLinkButton label="메인으로" to="/creator" {...linkProps} />
        </div>
      </div>
    </InvitationCardFrame>
  );
}
