// HoldFillButtonBase.tsx
import { useMemo } from "react";
import type React from "react";
import clsx from "clsx";

import { useResponsiveSizeToken, clamp01 } from "./holdFillButton.sizing";

type HoldFillButtonTone = "white" | "main";

type HoldFillButtonBaseProps = {
  /**
   * 진행도(0~1)
   * - progress 버전은 부모에서 관리
   */
  progress: number;

  /**
   * 색상 베이스 선택
   * - white: 기본은 화이트, hover에서 main-hover 컬러로 반응
   * - main: 기본은 메인, hover에서 main-hover 컬러로 반응
   */
  tone?: HoldFillButtonTone;

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
   * 버튼 이벤트 영역
   */
  ariaLabel?: string;
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (e?: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerCancel?: (e?: React.PointerEvent<HTMLButtonElement>) => void;
};

export default function HoldFillButtonBase({
  progress,
  tone = "white",
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

  /**
   * 색상 정책
   * - white tone:
   *   - 링: white
   *   - 내부 원: white
   *   - 홀딩 오버레이: main 계열을 아주 약하게(white 위에서 보이게)
   *
   * - main tone:
   *   - 링: main
   *   - 내부 원: main
   *   - 홀딩 오버레이: white를 아주 약하게(main 위에서 하이라이트)
   */
  const ringClassName = tone === "main" ? "border-main" : "border-white";

  const innerClassName = tone === "main" ? "bg-main" : "bg-white";

  const overlayStyle = useMemo(() => {
    if (!isHolding) return { opacity: 0 };

    // tone에 따라 오버레이 색을 바꿈
    if (tone === "main") {
      return { opacity: 0.1, backgroundColor: "white" };
    }
    return { opacity: 0.08, backgroundColor: "rgba(240, 138, 144, 1)" };
  }, [isHolding, tone]);

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
        className={clsx("absolute rounded-full border", ringClassName)}
        style={{
          width: size,
          height: size,
          borderWidth: ringWidth,
          boxSizing: "border-box",
          boxShadow:
            tone === "main"
              ? `0 0 0 1px rgba(255,255,255,0.25), 0 0 10px rgba(240,138,144,0.25)`
              : `0 0 0 1px rgba(255,255,255,0.35), 0 0 10px rgba(255,255,255,0.25)`,
        }}
      />

      {/* 내부 원: progress 기반으로 커짐 */}
      <div
        className={clsx("rounded-full transition-colors", innerClassName)}
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
          ...overlayStyle,
        }}
      />
    </button>
  );
}
