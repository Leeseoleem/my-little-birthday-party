import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/")({
  component: CreatorLandingPage,
});

function CreatorLandingPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>C1. 랜딩 / 시작하기</p>
      <BottomActionSlot>
        <CommonLinkButton label="C2. 수신자 정보 입력으로" to="/creator/info" />
      </BottomActionSlot>
    </div>
  );
}
