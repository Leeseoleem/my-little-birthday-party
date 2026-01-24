import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// --- 음악 재생 관련 ----
import happyBirthdayAudio from "../../../assets/audio/happy-birthday-short.mp3";
import { useAutoPlay } from "../../../hooks/useAutoPlay";

import type {
  CakeEventPhase,
  GuideMessageState,
} from "../../../features/receiver/event/types/cakeEventPhase.types";
import { cakeDoc } from "../../../mocks/cakeMocks";

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

export const Route = createFileRoute("/r/$cardId/event")({
  component: ReceiverEventPage,
});

function ReceiverEventPage() {
  const [phase, setPhase] = useState<CakeEventPhase>("intro");

  // ----- 1. intro 상태 -----
  // 안내 문구 상태
  const [guideState, setGuideState] = useState<GuideMessageState>("show");

  const holdTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const blowOutTimerRef = useRef<number | null>(null);

  // 안내 문구 타이밍 상수
  const INTRO_TEXT_HOLD_MS = 4000; // 문구 유지
  const INTRO_TEXT_FADE_MS = 400; // 문구가 사라지는(페이드아웃) 시간

  // ----- 2. reveal 상태 -----
  const [isOn, setIsOn] = useState<boolean>(true);

  useEffect(() => {
    // intro가 아니면 문구는 숨김 처리
    if (phase !== "intro") return;

    // 만약을 위한 타이머 정리
    if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);

    // fadeout 시작
    holdTimerRef.current = window.setTimeout(() => {
      setGuideState("fadeOut");

      fadeTimerRef.current = window.setTimeout(() => {
        setGuideState("hidden");
        setPhase("reveal");
      }, INTRO_TEXT_FADE_MS);
    }, INTRO_TEXT_HOLD_MS);

    // cleanup: phase 변경/언마운트 시 타이머 정리
    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      holdTimerRef.current = null;
      fadeTimerRef.current = null;
    };
  }, [phase]);

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
    };
  }, []);

  useAutoPlay({
    src: happyBirthdayAudio,
    shouldPlay: phase === "reveal",
    onEnded: () => setPhase("readyToBlow"),
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
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <GuideMessage state={guideState}>
            🎧 잠시 후 음악이 재생됩니다. <br /> 이어폰을 착용하면 더 깊이 즐길
            수 있어요.
          </GuideMessage>
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
                to="/r/$cardId/letter"
                params={{
                  cardId: "demo",
                }}
              />
            </BottomActionSlot>
          </PhaseLayer>
        )}
      </AnimatePresence>
    </div>
  );
}
