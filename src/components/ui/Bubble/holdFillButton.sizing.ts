// holdFillButton.sizing.ts
import { useEffect, useMemo, useState } from "react";

/**
 * 프로젝트 기준 반응형 사이즈 토큰
 */
export const SIZE_TOKEN = {
  mobile: {
    size: 80,
    ringWidth: 2,
    innerSize: 24,
  },
  tablet: {
    size: 100,
    ringWidth: 3,
    innerSize: 36,
  },
  desktop: {
    size: 120,
    ringWidth: 3,
    innerSize: 50,
  },
} as const;

/**
 * 브레이크포인트 기준
 */
export const BREAKPOINT = {
  tabletMin: 768,
  desktopMin: 1024,
} as const;

/**
 * viewport 폭에 따라 사이즈 토큰 선택
 */
export function useResponsiveSizeToken() {
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

/**
 * 값을 0과 1 사이로 강제로 고정(clamp)하는 유틸 함수
 */
export function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
