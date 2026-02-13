import { useNavigate, useParams } from "@tanstack/react-router";

import ReceiptLayout from "../../../components/layout/frame/ReceiptLayout";
import InvitationInfo, {
  type InvitationInfoProps,
} from "../../../components/shared/invitation/InvitationInfo";
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
    <ReceiptLayout
      header={{
        title: "초대장",
        subTitle: "소중한 사람을 위한 생일 파티가 준비됐어요",
      }}
      footer={
        <div className="flex flex-col w-full gap-6">
          <InvitationGuide variant="receiver" />
          <div className="w-full flex justify-center">
            <CommonButton label="입장하기" onClick={handleEnter} />
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
