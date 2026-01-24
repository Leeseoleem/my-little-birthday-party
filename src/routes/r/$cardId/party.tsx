import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/r/$cardId/party")({
  component: ReceiverPartyPage,
});

function ReceiverPartyPage() {
  // 라우팅 state 읽기
  const locationState = useRouterState({
    select: (s) => s.location.state as { entry?: "first" } | undefined,
  });

  const shouldShowIntro = locationState?.entry === "first";

  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  useEffect(() => {
    if (!shouldShowIntro) return;

    // 안내 문구 노출 시간
    const introTimeout = window.setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => window.clearTimeout(introTimeout);
  }, [shouldShowIntro]);

  return (
    <div className="flex flex-1 flex-col justify-center">
      <p>최종 파티 화면(캐릭터/케이크/편지 상호작용)</p>
      <BottomActionSlot>
        <CommonLinkButton label="처음으로" to="/r/$cardId" />
      </BottomActionSlot>
    </div>
  );
}
