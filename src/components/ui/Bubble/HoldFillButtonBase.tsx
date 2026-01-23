// HoldFillButtonBase.tsx
import { useMemo } from "react";
import clsx from "clsx";

import { useResponsiveSizeToken, clamp01 } from "./holdFillButton.sizing";

type HoldFillButtonBaseProps = {
  /**
   * 진행도(0~1)
   * - progress 버전은 부모에서 넣어줌
   * - auto 버전은 내부에서 만든 값을 넣어줌
   */
  progress: number;

  /**
   * 눌림 강조(밝은 오버레이) 표시 여부
   */
  isHolding?: boolean;

  /**
   * 비활성화
   */
  disabled?: boolean;

  className?: string;

  /**
   * 버튼 이벤트는 "공통 버튼"에서 처리해도 되고,
   * 바깥 래퍼에서 처리해도 됨.
   * 여기서는 공통 버튼이 사이즈를 관리하므로
   * 이벤트도 같이 받을 수 있게 열어둠.
   */
  ariaLabel?: string;
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (e?: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerCancel?: (e?: React.PointerEvent<HTMLButtonElement>) => void;
};

/**
 * 공통 버튼 UI + 사이즈/scale 계산을 "전부" 내부에서 처리
 * - progress(0~1)만 외부에서 주면 됨
 */
export default function HoldFillButtonBase({
  progress,
  isHolding = false,
  disabled = false,
  className,
  ariaLabel = "길게 누르기",
  onPointerDown,
  onPointerUp,
  onPointerCancel,
}: HoldFillButtonBaseProps) {
  const { size, ringWidth, innerSize } = useResponsiveSizeToken();

  // 내부 원 최대 지름(링 안쪽)
  const maxInnerDiameter = useMemo(() => {
    const inset = ringWidth * 2;
    return Math.max(0, size - inset);
  }, [size, ringWidth]);

  // 내부 원 scale 시작값 (innerSize를 maxInnerDiameter에 맞추는 비율)
  const initialFillScale = useMemo(() => {
    if (maxInnerDiameter === 0) return 0;
    return innerSize / maxInnerDiameter;
  }, [innerSize, maxInnerDiameter]);

  // progress(0~1) -> 실제 transform scale 값으로 변환
  const fillScale = useMemo(() => {
    const p = clamp01(progress);
    return initialFillScale + (1 - initialFillScale) * p;
  }, [progress, initialFillScale]);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      style={{ width: size, height: size, touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={clsx(
        "relative inline-grid place-items-center select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {/* 바깥 링 */}
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          border: `${ringWidth}px solid white`,
          boxSizing: "border-box",
        }}
      />

      {/* 내부 원: progress 기반으로 커짐 */}
      <div
        className="rounded-full bg-gray-0 hover:bg-gray-5"
        style={{
          width: maxInnerDiameter,
          height: maxInnerDiameter,
          transform: `scale(${fillScale})`,
          transformOrigin: "center",
          transition: "transform 40ms linear",
        }}
      />

      {/* 눌림 강조 */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          opacity: isHolding ? 0.06 : 0,
          backgroundColor: "white",
        }}
      />
    </button>
  );
}
