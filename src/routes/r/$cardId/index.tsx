import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/r/$cardId/")({
  component: ReceiverEntryGatePage,
});

function ReceiverEntryGatePage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>진입 분기 컨트롤러(PIN / event / party 라우팅 결정)</p>
      <BottomActionSlot>
        <CommonLinkButton
          label="2. 케이크 등장 + 촛불 끄기 인터랙션으로"
          to="/r/$cardId/event"
        />
      </BottomActionSlot>
    </div>
  );
}
