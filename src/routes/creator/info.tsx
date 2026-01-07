import { createFileRoute } from "@tanstack/react-router";

import InvitationCreateCard from "../../features/creator/components/InvitationCreateCard";

import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/info")({
  staticData: {
    creatorHeader: {
      value: 0.2,
      fallbackTo: "/creator",
    },
  },
  component: CreatorInfoPage,
});

function CreatorInfoPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex-1 flex items-center justify-center">
        <InvitationCreateCard />
      </div>
      <BottomActionSlot>
        <CommonLinkButton label="C3. 편지 작성으로" to={"/creator/letter"} />
      </BottomActionSlot>
    </div>
  );
}
