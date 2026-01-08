import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/r/$cardId/event")({
  component: ReceiverEventPage,
});

function ReceiverEventPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>케이크 등장 + 촛불 끄기 인터랙션</p>
      <BottomActionSlot>
        <CommonLinkButton
          label="3. 편지 감상(내용 열람)"
          to="/r/$cardId/letter"
        />
      </BottomActionSlot>
    </div>
  );
}
