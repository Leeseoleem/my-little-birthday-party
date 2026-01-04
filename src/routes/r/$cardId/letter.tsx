import { createFileRoute } from "@tanstack/react-router";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/r/$cardId/letter")({
  component: ReceiverLetterPage,
});

function ReceiverLetterPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>편지 감상(내용 열람)</p>
      <BottomActionSlot>
        <CommonLinkButton label="4. 최종 파티 화면으로" to="/r/$cardId/party" />
      </BottomActionSlot>
    </div>
  );
}
