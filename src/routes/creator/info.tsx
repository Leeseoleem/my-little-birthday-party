import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/info")({
  component: CreatorInfoPage,
});

function CreatorInfoPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>수신자 정보 입력</p>
      <BottomActionSlot>
        <CommonLinkButton label="C3. 편지 작성으로" to={"/creator/letter"} />
      </BottomActionSlot>
    </div>
  );
}
