import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/cake/build")({
  staticData: {
    creatorHeader: {
      value: 0.8,
      fallbackTo: "/creator/cake/select",
    },
  },
  component: CreatorCakeBuildPage,
});

function CreatorCakeBuildPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>케이크 제작</p>
      <BottomActionSlot>
        <CommonLinkButton label="6. 캐릭터 선택으로" to="/creator/guests" />
      </BottomActionSlot>
    </div>
  );
}
