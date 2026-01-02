import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/letter")({
  component: CreatorLetterPage,
});

function CreatorLetterPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>편지 작성</p>
      <BottomActionSlot>
        <CommonLinkButton
          label="4. 케이크 선택으로"
          to={"/creator/cake/select"}
        />
      </BottomActionSlot>
    </div>
  );
}
