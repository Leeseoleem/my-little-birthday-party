import React, { useEffect, useRef, useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  type Placement,
} from "@floating-ui/react";
import clsx from "clsx";
import TextBubble from "./TextBubble";
import type { BubbleTailPosition } from "./bubble.types";

type AnchoredBubbleProps = {
  trigger: React.ReactNode; // 앵커 요소(캐릭터)

  message: string;
  tail?: BubbleTailPosition; // 버블 모양

  placement?: Placement; // 위치 계산용 ("top", "top-start" 등)

  gapPx?: number; // 캐릭터와 간격
  disabled?: boolean; // 클릭 비활성화 여부
};

export default function AnchoredBubble({
  trigger,
  message,
  tail = "left-bottom",
  placement = "top",
  gapPx = 8,
  disabled = false,
}: AnchoredBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // DOM 유지 여부

  // 자동 닫힘 타이머 참조
  const timerRef = useRef<number | null>(null);
  const unmountRef = useRef<number | null>(null);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement,
    middleware: [
      offset(gapPx), // 기준 요소와의 간격
      flip(), // 화면 밖이면 반대편으로 이동
      shift({ padding: 8 }), // 화면 가장자리 침범 방지
    ],
    whileElementsMounted: autoUpdate, // 스크롤/리사이즈 대응
  });

  // 트리거 클릭 핸들러
  const handleTriggerClick = () => {
    if (disabled) return;

    // 기존 타이머 정리
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (unmountRef.current) window.clearTimeout(unmountRef.current);

    // 1) 렌더 보장
    setShouldRender(true);

    // 2) 다음 프레임에 open=true로 전환 (transition 시작을 확실히 하기 위함)
    requestAnimationFrame(() => {
      setIsOpen(true);
    });

    // 3) duration 후 open=false (페이드아웃 시작)
    timerRef.current = window.setTimeout(() => {
      setIsOpen(false);

      // 4) 페이드아웃 끝난 뒤 DOM 제거
      unmountRef.current = window.setTimeout(() => {
        setShouldRender(false);
        unmountRef.current = null;
      }, 400);
    }, 3000);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      if (unmountRef.current) window.clearTimeout(unmountRef.current);
    };
  }, []);
  return (
    <div className="inline-block">
      {/* 기준 요소 (캐릭터 등) */}
      <button
        type="button"
        ref={refs.setReference} // Floating UI 기준점
        onClick={handleTriggerClick}
        className={clsx("inline-flex", disabled && "pointer-events-none")}
      >
        {trigger}
      </button>

      {/* 말풍선 (토스트처럼 조건부 렌더링) */}
      {shouldRender && (
        <div
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating} // Floating UI 대상 요소
          style={floatingStyles} // 계산된 위치 스타일
          className={clsx(
            "z-50",
            "transition-opacity",
            isOpen ? "opacity-100" : "opacity-0",
            "duration-[400ms]"
          )}
        >
          <TextBubble message={message} tail={tail} />
        </div>
      )}
    </div>
  );
}
