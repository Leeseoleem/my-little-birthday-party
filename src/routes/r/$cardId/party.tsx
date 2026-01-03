import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/r/$cardId/party")({
  component: ReceiverPartyPage,
});

function ReceiverPartyPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>최종 파티 화면(캐릭터/케이크/편지 상호작용)</p>
      <BottomActionSlot>
        <CommonLinkButton label="처음으로" to="/r/$cardId" />
      </BottomActionSlot>
    </div>
  );
}
