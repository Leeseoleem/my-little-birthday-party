import type { LinkProps } from "@tanstack/react-router";

// === components ===
import ReceiptLayout from "../../../../components/layout/frame/ReceiptLayout";
// content
import InvitationInfo, {
  type InvitationInfoProps,
} from "../../../../components/shared/invitation/InvitationInfo";
// footer
import InvitationGuide from "../../../../components/shared/invitation/InvitationGuide";
import ShareButtons, {
  type ShareButtonsProps,
} from "../../../../components/shared/ShareButtons";
import CommonLinkButton from "../../../../components/ui/Button/CommonLinkButton";

type InvitationCompleteCardProps = {
  info: InvitationInfoProps;
  sns: ShareButtonsProps;
} & Omit<LinkProps, "to" | "children" | "className">;

export default function InvitationCompleteCard({
  info,
  sns,
  ...linkProps
}: InvitationCompleteCardProps) {
  return (
    <ReceiptLayout
      header={{
        title: "초대장",
        subTitle: "소중한 사람을 위한 생일 파티가 준비됐어요",
      }}
      footer={
        <div className="flex flex-col w-full gap-6">
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
        </div>
      }
    >
      <div className="flex flex-col w-full gap-6">
        <InvitationInfo {...info} />
        <img
          alt="" // 장식용 이미지이므로 스크린 리더가 건너뛸 수 있게 공백 처리
          src="/assets/decor/invitation-complete.png"
          className="w-full max-w-[300px] mdh:max-w-[350px] lgh:max-w-[500px]"
        />
      </div>
    </ReceiptLayout>
  );
}
