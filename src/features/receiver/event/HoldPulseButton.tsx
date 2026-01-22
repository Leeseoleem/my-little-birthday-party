import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import clsx from "clsx";

type HoldFillButtonProps = {
  onFilled?: () => void; // 내부 원이 끝까지 차면 호출
  disabled?: boolean;
  duration?: number; // 길게 누르는 시간 (초 단위)
  className?: string;
};

/**
 * 프로젝트 기준 반응형 사이즈 토큰
 */
const SIZE_TOKEN = {
  mobile: {
    size: 80,
    ringWidth: 3,
    innerSize: 36,
  },
  tablet: {
    size: 100,
    ringWidth: 4,
    innerSize: 46,
  },
  desktop: {
    size: 120,
    ringWidth: 4,
    innerSize: 56,
  },
};

// 브레이크포인트 기준
const BREAKPOINT = {
  tabletMin: 768,
  desktopMin: 1024,
};

/**
 * viewport 폭에 따라 사이즈 토큰 선택
 */
function useResponsiveSizeToken() {
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return useMemo(() => {
    if (width >= BREAKPOINT.desktopMin) return SIZE_TOKEN.desktop;
    if (width >= BREAKPOINT.tabletMin) return SIZE_TOKEN.tablet;
    return SIZE_TOKEN.mobile;
  }, [width]);
}

export default function HoldFillButton({
  onFilled,
  disabled = false,
  duration = 1.5, // 기본값
  className,
}: HoldFillButtonProps) {
  const controls = useAnimationControls();
  const [isHolding, setIsHolding] = useState(false);

  const { size, ringWidth, innerSize } = useResponsiveSizeToken();

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const holdingRef = useRef(false);

  // 내부 원 최대 지름(링 안쪽)
  const maxInnerDiameter = useMemo(() => {
    const inset = ringWidth * 2;
    return Math.max(0, size - inset);
  }, [size, ringWidth]);

  // scale 시작값 계산
  const initialScale = useMemo(() => {
    if (maxInnerDiameter === 0) return 0;
    return innerSize / maxInnerDiameter;
  }, [innerSize, maxInnerDiameter]);

  const startHoldSafe = useCallback(
    async (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      btnRef.current?.setPointerCapture?.(e.pointerId);

      holdingRef.current = true;
      setIsHolding(true);

      controls.set({ scale: initialScale });

      await controls.start({
        scale: 1,
        transition: {
          duration,
          ease: "linear",
        },
      });

      // 끝까지 도달 + 아직 누르는 중이면 완료
      if (holdingRef.current) {
        holdingRef.current = false;
        setIsHolding(false);
        onFilled?.();
      }
    },
    [controls, disabled, initialScale, onFilled, duration],
  );

  const endHold = useCallback(
    async (e?: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return;

      holdingRef.current = false;
      setIsHolding(false);

      if (e && btnRef.current) {
        btnRef.current.releasePointerCapture?.(e.pointerId);
      }

      controls.stop();

      await controls.start({
        scale: initialScale,
        transition: { duration: 0.15, ease: "easeOut" },
      });
    },
    [controls, disabled, initialScale],
  );

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="길게 눌러 촛불 끄기"
      disabled={disabled}
      style={{ width: size, height: size, touchAction: "none" }}
      onPointerDown={startHoldSafe}
      onPointerUp={endHold}
      onPointerCancel={endHold}
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

      {/* 내부 원 */}
      <motion.div
        className="rounded-full bg-gray-0 hover:bg-gray-5"
        style={{
          width: maxInnerDiameter,
          height: maxInnerDiameter,
        }}
        initial={{ scale: initialScale }}
        animate={controls}
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
