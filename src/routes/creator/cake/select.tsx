import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/cake/select")({
  staticData: {
    creatorHeader: {
      value: 0.6,
      fallbackTo: "/creator/letter",
    },
  },
  component: CreatorCakeSelectPage,
});

function CreatorCakeSelectPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>케이크 선택</p>
      <BottomActionSlot>
        <CommonLinkButton
          label="5. 케이크 제작으로"
          to={"/creator/cake/build"}
        />
      </BottomActionSlot>
    </div>
  );
}
