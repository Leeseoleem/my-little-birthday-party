import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  LETTER_PAPER_PRESET,
  type LetterPaperType,
} from "../../types/letterPaper.types";
import { ENVELOPE_BASE_WIDTH, MASK_BASE } from "../../constant/assetDimensions";

export type Mode = "idle" | "fly";

interface EnvelopeLetterProps {
  letterPaperType: LetterPaperType;
  mode: Mode;
  progress?: number; // idle 모드에서만 사용 (0~1)
  onFlyComplete?: () => void;
  debug?: boolean;
}

/**
 * 0~1을 "매우 느림 → 점점 빨라짐"으로 재매핑
 * - power가 클수록 초반이 더 느리고, 후반이 더 급해진다.
 * - power=3: 기본 cubic, power=4~6: 매우 느림→빠름 느낌 강함
 */
function easeSlowToFast(p: number, power = 3) {
  const t = Math.max(0, Math.min(1, p));
  return Math.pow(t, power);
}

const EnvelopeLetter = ({
  letterPaperType,
  mode,
  progress = 0,
  onFlyComplete,
  debug = false,
}: EnvelopeLetterProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [renderW, setRenderW] = useState(0);

  // 실제 렌더된 봉투 폭(px) 추적
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setRenderW(el.getBoundingClientRect().width);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ENVELOPE_BASE_WIDTH(원본 기준 폭) 대비 현재 renderW 비율
  const scale = useMemo(() => {
    if (!renderW) return 1;
    return renderW / ENVELOPE_BASE_WIDTH;
  }, [renderW]);

  // 슬롯(입구) 기준값
  const slot = useMemo(() => {
    return {
      top: MASK_BASE.top * scale,
      width: MASK_BASE.width * scale,
      height: MASK_BASE.height * scale,
      radius: MASK_BASE.radius * scale,
    };
  }, [scale]);

  const letterSrc = LETTER_PAPER_PRESET[letterPaperType].imageSrc;

  /**
   * 봉투 520px 기준 편지 420px 비율을 반응형으로 유지
   * - renderW가 줄면 letterRenderW도 같은 비율로 줄어든다
   */
  const ENVELOPE_MAX_W = 520;
  const LETTER_MAX_W = 430;
  const LETTER_W_RATIO = LETTER_MAX_W / ENVELOPE_MAX_W;

  const letterRenderW = useMemo(() => {
    if (!renderW) return 0;
    return renderW * LETTER_W_RATIO;
  }, [renderW, LETTER_W_RATIO]);

  // 편지 시작 위치(봉투 안)
  const startBottom = -900 * scale;

  // progress=1일 때 거의 다 나온 상태(연출값)
  const pulledBottom = slot.height * 0.9;

  // 연출용 progress 곡선 적용
  const easedProgress = useMemo(() => easeSlowToFast(progress), [progress]);

  // idle 상태에서 편지 상승/복귀
  const idleBottom = startBottom + (pulledBottom - startBottom) * easedProgress;

  // fly 애니메이션: 빠르게 위로 튀며 사라짐
  const flyAnimate = useMemo(() => {
    if (mode !== "fly") return undefined;

    return {
      y: [0, -1100 * scale],
      opacity: [1, 0],
    };
  }, [mode, scale]);

  const flyTransition: Transition = {
    duration: 0.7,
    ease: [0.12, 0.0, 0.2, 1.0],
  };

  const envelopeOpacity = useMemo(() => {
    if (mode !== "fly") return undefined;
    return {
      opacity: 0, // 흐려지며 사라짐
      y: -18 * scale, // 아주 살짝만 들림 (날아가는 느낌 방지)
      scale: 0.985, // 살짝 축소
    };
  }, [mode, scale]);

  // 봉투 입구 라인: 이 아래는 포켓(앞면)이 덮어야 함
  const openingY = slot.top + 120 * scale;

  // 편지 클리핑: openingY 아래는 숨기고, 위는 무제한 허용
  const CLIP_TOP_PADDING = 2000 * scale;
  const letterClipTop = -CLIP_TOP_PADDING;
  const letterClipHeight = CLIP_TOP_PADDING + openingY;

  return (
    <motion.div
      ref={wrapRef}
      className="relative w-full max-w-[520px]"
      animate={envelopeOpacity}
      transition={flyTransition}
    >
      {/* 1) 봉투(뒤/배경) */}
      <img
        src="/assets/envelopes/letter-envelope-open.png"
        alt="open envelope back"
        draggable={false}
        className="block w-full h-auto pointer-events-none select-none"
      />
      {/* 2) 편지 레이어: 봉투 위(z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute left-0 right-0"
          style={{
            top: letterClipTop,
            height: letterClipHeight,
            overflow: "hidden",
            outline: debug ? "2px dashed rgba(0,0,0,0.25)" : "none",
          }}
        >
          {/*
            핵심:
            - "가로 중앙정렬(translateX)"을 motion.img가 아니라 바깥 래퍼에서 담당한다.
            - 그래야 fly(y) 애니메이션 때 Framer Motion이 transform을 재작성해도
              중앙정렬이 깨지지 않는다.
          */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: `${letterRenderW}px`,
              bottom: idleBottom,
            }}
          >
            <motion.img
              src={letterSrc}
              alt="letter"
              draggable={false}
              className="block w-full pointer-events-none select-none"
              style={{
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.08))",
              }}
              animate={flyAnimate}
              transition={flyTransition}
              onAnimationComplete={() => {
                if (mode === "fly") onFlyComplete?.();
              }}
            />
          </div>
        </div>
      </div>
      {/* 3) 봉투(앞/포켓): openingY 아래만 남겨 덮기 */}
      <img
        src="/assets/envelopes/letter-envelope-open.png"
        alt="open envelope front"
        draggable={false}
        className="absolute inset-0 z-20 w-full h-auto pointer-events-none select-none"
        style={{
          clipPath: `inset(${openingY}px 0px 0px 0px)`,
        }}
      />
      {/* debug: openingY 라인 표시 */}
      {debug && (
        <div
          className="absolute left-0 right-0 z-30"
          style={{
            top: openingY,
            height: 1,
            background: "rgba(255,0,0,0.5)",
          }}
        />
      )}
    </motion.div>
  );
};

export default EnvelopeLetter;
