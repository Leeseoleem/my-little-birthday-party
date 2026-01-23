import { useCallback, useEffect, useRef, useState } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import clsx from "clsx";

import HoldFillButtonBase from "../../../components/ui/Bubble/HoldFillButtonBase";

type HoldFillButtonProps = {
  onFilled?: () => void; // 내부 원이 끝까지 차면 호출
  disabled?: boolean;
  duration?: number; // 길게 누르는 시간 (초 단위)
  className?: string;
};

export default function HoldFillButton({
  onFilled,
  disabled = false,
  duration = 1.5,
  className,
}: HoldFillButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  // 현재 "누르는 중"인지 동기적으로 판단하기 위한 ref
  const holdingRef = useRef(false);

  // 숫자 애니메이션 컨트롤 핸들(중간에 stop 필요)
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  const stopAnim = useCallback(() => {
    if (animRef.current) {
      animRef.current.stop();
      animRef.current = null;
    }
  }, []);

  // disabled가 켜지면 즉시 정리
  useEffect(() => {
    if (!disabled) return;

    holdingRef.current = false;
    stopAnim();
  }, [disabled, stopAnim]);

  const startHoldSafe = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // 같은 포인터로 드래그/이탈해도 up/cancel을 안정적으로 받기 위함
      e.currentTarget.setPointerCapture?.(e.pointerId);

      holdingRef.current = true;
      setIsHolding(true);

      // 이전 애니메이션이 남아있으면 정리
      stopAnim();

      // 시작은 0부터(원하면 "현재 progress"에서 시작하도록 바꿀 수도 있음)
      setProgress(0);

      // 0 -> 1 까지 duration 동안 선형 증가
      animRef.current = animate(0, 1, {
        duration,
        ease: "linear",
        onUpdate: (latest) => {
          // React state는 0~1 범위로만 유지
          setProgress(latest);
        },
        onComplete: () => {
          // 완료 시점에 아직 누르는 중이면 성공 처리
          if (!holdingRef.current) return;

          holdingRef.current = false;
          setIsHolding(false);
          onFilled?.();
        },
      });
    },
    [disabled, duration, onFilled, stopAnim],
  );

  const endHold = useCallback(
    (e?: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      holdingRef.current = false;
      setIsHolding(false);

      // pointer capture 해제
      if (e) {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }

      // 진행 중 애니메이션 즉시 중단
      stopAnim();

      // 현재 progress에서 0으로 빠르게 복귀(시각적 리셋)
      // - Base 내부 transform에 transition이 있으니 0.12~0.18s 정도면 충분
      animRef.current = animate(progress, 0, {
        duration: 0.15,
        ease: "easeOut",
        onUpdate: (latest) => setProgress(latest),
        onComplete: () => {
          animRef.current = null;
        },
      });
    },
    [disabled, progress, stopAnim],
  );

  return (
    <HoldFillButtonBase
      progress={progress}
      isHolding={isHolding}
      disabled={disabled}
      ariaLabel="길게 눌러 촛불 끄기"
      onPointerDown={startHoldSafe}
      onPointerUp={endHold}
      onPointerCancel={endHold}
      className={clsx(className)}
    />
  );
}
