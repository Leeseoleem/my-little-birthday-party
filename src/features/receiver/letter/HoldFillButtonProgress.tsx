import { animate, type AnimationPlaybackControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import HoldFillButtonBase from "../../../components/ui/Bubble/HoldFillButtonBase";

type HoldFillButtonProgressProps = {
  onProgressChange?: (progress: number) => void;
  onFilled?: () => void;
  disabled?: boolean;
  duration?: number; // 0 → 1까지 걸리는 시간(초)
  className?: string;
};

export default function HoldFillButtonProgress({
  onProgressChange,
  onFilled,
  disabled = false,
  duration = 1.5,
  className,
}: HoldFillButtonProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  // "지금 누르고 있는 중인가?"를 렌더와 무관하게 판단하기 위한 ref
  const holdingRef = useRef(false);

  // framer-motion 숫자 애니메이션 핸들
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  /** 진행 중 애니메이션 중단 */
  const stopAnim = useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
  }, []);

  /** disabled 전환 시: 외부 시스템(애니메이션)만 정리 */
  useEffect(() => {
    if (!disabled) return;

    holdingRef.current = false;
    stopAnim();
  }, [disabled, stopAnim]);

  /** 길게 누르기 시작 */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // 버튼 밖으로 나가도 pointerUp을 받기 위해 capture
      e.currentTarget.setPointerCapture?.(e.pointerId);

      holdingRef.current = true;
      setIsHolding(true);

      stopAnim();
      setProgress(0);
      onProgressChange?.(0);

      // progress: 0 → 1
      animRef.current = animate(0, 1, {
        duration,
        ease: "linear",
        onUpdate: (v) => {
          setProgress(v);
          onProgressChange?.(v);
        },
        onComplete: () => {
          // 끝까지 도달했는데 아직 누르는 중이면 성공
          if (!holdingRef.current) return;

          holdingRef.current = false;
          setIsHolding(false);
          onFilled?.();
        },
      });
    },
    [disabled, duration, onFilled, onProgressChange, stopAnim],
  );

  /** 손을 떼거나 cancel */
  const handlePointerEnd = useCallback(
    (e?: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      holdingRef.current = false;
      setIsHolding(false);

      if (e) {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }

      stopAnim();

      // 현재 progress → 0으로 빠르게 복귀
      animRef.current = animate(progress, 0, {
        duration: 0.15,
        ease: "easeOut",
        onUpdate: (v) => {
          setProgress(v);
          onProgressChange?.(v);
        },
        onComplete: () => {
          animRef.current = null;
        },
      });
    },
    [disabled, progress, onProgressChange, stopAnim],
  );

  // disabled일 때는 UI 표현을 강제로 리셋
  const uiProgress = disabled ? 0 : progress;
  const uiIsHolding = disabled ? false : isHolding;

  return (
    <HoldFillButtonBase
      tone="main"
      progress={uiProgress}
      isHolding={uiIsHolding}
      disabled={disabled}
      ariaLabel="길게 눌러 편지 꺼내기"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      className={clsx(className)}
    />
  );
}
