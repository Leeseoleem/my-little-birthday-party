import {
  createFileRoute,
  useRouterState,
  useNavigate,
  redirect,
} from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

// -- DB 관련 ---
import { markCardOpened } from "../../../lib/api/receiver/markCardOpened";
import { getCakePartyData } from "../../../lib/api/receiver/getCakePartyData";

// --- 헤더 관련 ---
import { AppHeader } from "../../../components/ui/Header";
import { MusicButton } from "../../../components/ui/Header/MusicButton";
import happyBirthday from "../../../assets/audio/happy-birthday-story.mp3";
import { useAutoPlay } from "../../../hooks/useAutoPlay";

// --- 레이아웃 관련 ---
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
  loader: async ({ params }) => {
    const { cardId } = params;

    try {
      const cakeData = await getCakePartyData(cardId);

      return {
        cakeType: cakeData.cake_type ?? "party",
      };
    } catch (error) {
      // 개발자 확인용 로그(사용자에게는 노출하지 않음)
      if (error instanceof Error) {
        console.error("party loader error:", error.message, error);
      } else {
        console.error("party loader error:", error);
      }

      // 사용자용 에러 페이지로 이동
      throw redirect({
        to: "/r/expired",
      });
    }
  },
  component: ReceiverPartyPage,
});

function ReceiverPartyPage() {
  const navigate = useNavigate();

  const { cardId } = Route.useParams();

  const { cakeType } = Route.useLoaderData();

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

  // 3) party 도달 시 opened_at 업데이트 (부작용이므로 컴포넌트에서 실행)
  // StrictMode에서 effect가 2번 실행될 수 있으니 ref로 1회만 실행
  const openedOnceRef = useRef(false);

  useEffect(() => {
    if (openedOnceRef.current) return;
    openedOnceRef.current = true;

    void markCardOpened(cardId).catch((e) => {
      const message = e instanceof Error ? e.message : "알 수 없는 오류";
      console.error(message);
    });
  }, [cardId]);

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
            {/*  ----- 케이크 / 편지  ----- */}
            <div className="flex-1 flex items-center justify-center pt-36">
              <PartyTableStage cakeType={cakeType} />
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
