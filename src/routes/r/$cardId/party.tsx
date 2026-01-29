import {
  createFileRoute,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { AppHeader } from "../../../components/ui/Header";
import { MusicButton } from "../../../components/ui/Header/MusicButton";
import happyBirthday from "../../../assets/audio/happy-birthday-story.mp3";
import { useAutoPlay } from "../../../hooks/useAutoPlay";

import IntroSection from "../../../features/receiver/party/sections/IntroSection";
import GarlandLayout from "../../../components/layout/page/GarlandLayout";
import BalloonsBackdrop from "../../../components/layout/page/BalloonsBackdrop";

import PartyTableStage from "../../../features/receiver/party/PartyTableStage";

import ConfettiLayer, {
  type ConfettiLayerHandle,
} from "../../../components/layout/frame/ConfettiLayer";
import FireConfettiButton from "../../../features/receiver/party/FireConfettiButton";

const INTRO_VISIBLE_MS = 2500;
const INTRO_FADE_SEC = 0.4;

export const Route = createFileRoute("/r/$cardId/party")({
  component: ReceiverPartyPage,
});

function ReceiverPartyPage() {
  const navigate = useNavigate();

  const { cardId } = Route.useParams();

  // 라우팅 state 읽기
  const locationState = useRouterState({
    select: (s) => s.location.state as { entry?: "first" } | undefined,
  });

  const hasIntro = locationState?.entry === "first";

  const [showIntro, setShowIntro] = useState(() => hasIntro);

  // 사용자 토글(나중에 버튼으로 제어)
  const [isBgmEnabled, setIsBgmEnabled] = useState(true);
  const [shouldPlayBgm, setShouldPlayBgm] = useState(() => !hasIntro);

  // 1) 인트로는 지정 시간 뒤에 사라짐
  useEffect(() => {
    if (!showIntro) return;

    const t = window.setTimeout(() => {
      setShowIntro(false);
      setShouldPlayBgm(true);
    }, INTRO_VISIBLE_MS);

    return () => window.clearTimeout(t);
  }, [showIntro]);

  // 2) 새로고침 재노출 방지를 위해 state는 즉시 삭제
  useEffect(() => {
    if (!showIntro) return;

    navigate({
      to: "/r/$cardId/party",
      params: { cardId },
      replace: true,
      state: undefined,
    });
  }, [showIntro, navigate, cardId]);

  useAutoPlay({
    src: happyBirthday,
    shouldPlay: shouldPlayBgm && isBgmEnabled,
    playOnce: false,
  });

  // ConfettiLayer의 imperative handle을 받는 ref
  const confettiLayerRef = useRef<ConfettiLayerHandle | null>(null);

  const handleClick = useCallback(() => {
    // ref가 null일 수 있으니 optional chaining으로 안전 호출
    void confettiLayerRef.current?.fire();
  }, []);

  return (
    <div className="relative flex flex-1 overflow-hidden bg-gray-90">
      {/* 컨페티 */}
      <ConfettiLayer ref={confettiLayerRef} />
      {/* ----- 인트로 오버레이 ----- */}
      <AnimatePresence>
        {showIntro && <IntroSection duration={INTRO_FADE_SEC} />}
      </AnimatePresence>

      {/* ----- 파티 본문 레이어 ----- */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center">
        <AppHeader
          right={
            <MusicButton
              isPlaying={isBgmEnabled}
              onToggle={() => setIsBgmEnabled(!isBgmEnabled)}
            />
          }
        />
        <GarlandLayout hasHeader>
          <BalloonsBackdrop />
          <div className="flex flex-col h-full">
            {/*  ----- 캐릭터 / 케이크 / 편지  ----- */}
            <div className="flex-1 flex items-center justify-center pt-36">
              <PartyTableStage cakeType="cheese" />
            </div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <FireConfettiButton onClick={handleClick} />
            </div>
          </div>
        </GarlandLayout>
      </div>
    </div>
  );
}
