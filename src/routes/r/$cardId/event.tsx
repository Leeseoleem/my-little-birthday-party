import { createFileRoute, redirect } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

// --- db 관련 ---
import { getReceiverCakeDoc } from "../../../lib/api/receiver/getReceiverCakeDoc";
import type { CakeDoc } from "../../../features/types/cake-doc.types";

// --- 페이지 분기 관련 ---
import {
  validateReturnToPartySearch,
  type ReturnToPartySearch,
} from "../../../utils/returnToParty";

// --- 음악 재생 관련 ----
import happyBirthdayAudio from "../../../assets/audio/happy-birthday-short.mp3";
import { useAudioUnlock } from "../../../hooks/useAudioUnlock";
import { useAutoPlay } from "../../../hooks/useAutoPlay";

import type {
  CakeEventPhase,
  GuideMessageState,
} from "../../../features/receiver/event/types/cakeEventPhase.types";

import { PhaseLayer } from "../../../components/layout/frame/PhaseLayer";
import OverlayLayer from "../../../features/receiver/event/OverlayLayer";
// --- 1. intro ---
import GuideMessage from "../../../features/receiver/event/GuideMessage";
// --- 2. reveal ---
import ReceiverCakeBase from "../../../features/receiver/event/ReceiverCakeBase";
import ReceiverCandleFlameLayer from "../../../features/receiver/event/ReceiverCandleFlameLayer";
// --- 3. readyToBlow ---
import GuideBubble from "../../../components/ui/Bubble/GuideBubble";
import HoldPulseButton from "../../../features/receiver/event/HoldPulseButton";
// --- 4. blown ---
import ConfettiLayer, {
  type ConfettiLayerHandle,
} from "../../../components/layout/frame/ConfettiLayer";
// --- 5. done ---
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";
import clsx from "clsx";
import CommonButton from "../../../components/ui/Button/Button";

export const Route = createFileRoute("/r/$cardId/event")({
  component: ReceiverEventPage,
  validateSearch: (search): ReturnToPartySearch => {
    return validateReturnToPartySearch(search);
  },
  loader: async ({ params }) => {
    try {
      const receiverCakeDoc = await getReceiverCakeDoc(params.cardId);
      return { receiverCakeDoc };
    } catch (error) {
      // 내부 에러는 로그로만 남김
      console.error("receiver event loader error:", error);

      // 사용자용 에러 페이지로 이동
      throw redirect({
        to: "/r/expired",
      });
    }
  },
});

function ReceiverEventPage() {
  // ----- 페이지 이동 분기 -----
  const { cardId } = Route.useParams();
  const search = Route.useSearch();

  const { receiverCakeDoc } = Route.useLoaderData();

  const cakeDoc: CakeDoc = {
    cakeType: receiverCakeDoc.cakeType,
    placedCandlesBySlot: receiverCakeDoc.candles,
  };

  const nextTo =
    search.returnTo === "party" ? "/r/$cardId/party" : "/r/$cardId/letter";

  const [phase, setPhase] = useState<CakeEventPhase>("intro");

  // ----- 1. intro 상태 -----
  // 안내 문구 상태
  const [guideState, setGuideState] = useState<GuideMessageState>("show");

  const fadeTimerRef = useRef<number | null>(null);
  const blowOutTimerRef = useRef<number | null>(null);

  // 안내 문구 타이밍 상수
  const INTRO_TEXT_FADE_MS = 400; // 문구가 사라지는(페이드아웃) 시간

  // ----- 2. reveal 상태 -----
  const [isOn, setIsOn] = useState<boolean>(true);

  const { unlock } = useAudioUnlock();

  const handleStartEvent = async () => {
    // intro에서만 동작하도록 가드
    if (phase !== "intro") return;

    // 이미 fadeOut 진행 중이면 중복 실행 방지
    if (guideState !== "show") return;

    // fadeOut 시작
    setGuideState("fadeOut");

    // 오디오 unlock 시도 (사용자 클릭 이벤트 안에서 실행되어야 함)
    const ok = await unlock();

    // unlock 실패 시
    if (!ok) {
      setGuideState("show"); // 롤백
      // 필요하면 안내 UI/토스트로 대체
      alert(
        "브라우저 설정으로 인해 음악 재생이 제한될 수 있어요. 다시 한 번 눌러주세요.",
      );
      return;
    }

    // 기존 타이머 정리
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    // fadeOut 애니메이션 종료 후 hidden + reveal로 전환
    fadeTimerRef.current = window.setTimeout(() => {
      setGuideState("hidden");
      setPhase("reveal");
      fadeTimerRef.current = null;
    }, INTRO_TEXT_FADE_MS);
  };

  // 촛불 끄기 함수
  const handleCandleBlowOut = () => {
    setIsOn(false);
    if (blowOutTimerRef.current) window.clearTimeout(blowOutTimerRef.current);
    blowOutTimerRef.current = window.setTimeout(() => {
      setPhase("blown");
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (blowOutTimerRef.current) window.clearTimeout(blowOutTimerRef.current);
      blowOutTimerRef.current = null;
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    };
  }, []);

  const handleAudioEnded = useCallback(() => {
    setPhase("readyToBlow");
  }, []);

  useAutoPlay({
    src: happyBirthdayAudio,
    shouldPlay: phase === "reveal",
    onEnded: handleAudioEnded,
  });

  // ----- 4. blown 상태 -----
  const confettiLayerRef = useRef<ConfettiLayerHandle | null>(null);

  useEffect(() => {
    if (phase !== "blown") return;

    let finished = false;

    const goDone = () => {
      if (finished) return;
      finished = true;
      setPhase("done");
    };

    const fireResult = confettiLayerRef.current?.fire();

    // fire()가 Promise를 반환한 경우
    if (fireResult && typeof fireResult.then === "function") {
      fireResult
        .then(() => {
          goDone();
        })
        .catch(() => {
          // 컨페티 실행 중 에러 → 그래도 done
          goDone();
        });
    } else {
      // confetti가 준비 안 됐거나 ref가 null
      goDone();
    }
  }, [phase]);

  return (
    <div className="relative flex-1 min-h-dvh overflow-hidden">
      {/* 컨페티 */}
      <ConfettiLayer ref={confettiLayerRef} />
      {/* ================= 케이크 씬 ================= */}
      <div className="relative min-h-dvh flex items-center justify-center px-4">
        {/* 기준 영역 */}
        <div className="relative w-full max-w-[520px]">
          {/* 불꽃 */}

          <ReceiverCandleFlameLayer
            cake={cakeDoc}
            className={clsx(
              "absolute inset-0",
              phase === "intro" ? "z-0" : "z-30",
            )}
            isOn={isOn}
          />

          {/* 케이크 + 초 (base) */}
          <ReceiverCakeBase cake={cakeDoc} className="absolute inset-0 z-0" />
        </div>
      </div>

      {/* 오버레이: 케이크 위 */}
      <OverlayLayer phase={phase} className="absolute inset-0 z-10 bg-black" />

      {/* 안내 문구: 오버레이 위 (정중앙 고정) */}
      {phase === "intro" && (
        <div className="absolute inset-0 z-20">
          {/* 중앙 가이드 메시지 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GuideMessage state={guideState}>
              🎧 아래 버튼을 누르면
              <br />
              음악과 함께 이벤트가 시작돼요.
              <br />
              이어폰을 착용하면 더 몰입해서 즐길 수 있어요.
            </GuideMessage>
          </div>

          {/* 하단 버튼 */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 px-4">
            <CommonButton label="확인했어요" onClick={handleStartEvent} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {/* 촛불 끄기 버튼 */}
        {phase === "readyToBlow" && (
          <PhaseLayer
            layerKey="readyToBlow"
            className="absolute inset-0 top-1 z-20 flex flex-col gap-8 items-center justify-center"
          >
            <HoldPulseButton onFilled={handleCandleBlowOut} />
            <GuideBubble message="가운데를 꾹 눌러 촛불을 꺼주세요" />
          </PhaseLayer>
        )}

        {/* 하단 버튼: 최상단 */}
        {phase === "done" && (
          <PhaseLayer
            layerKey="done"
            className="absolute inset-x-0 bottom-0 z-30"
          >
            <BottomActionSlot>
              <CommonLinkButton
                label="다음으로"
                to={nextTo}
                params={{
                  cardId,
                }}
              />
            </BottomActionSlot>
          </PhaseLayer>
        )}
      </AnimatePresence>
    </div>
  );
}
