import { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import CakeStack from "../../creator/components/build/CakeStack";

import { CAKE_MENU } from "../../creator/data/cakeMenu.data";
import { CAKE_CANDLE_POSITIONS } from "../../creator/data/cake.candle-positions";
import { PARTY_Z_ORDER } from "../../types/cake.types";

import { BASE_CAKE_IMAGE_WIDTH } from "../../constant/assetDimensions";
import type { CakeDoc } from "../../types/cake-doc.types";

import { toCircleCenterPoint } from "../../creator/utils/toCircleCenterPoint";
import { getCandleImageSrcById } from "../../creator/utils/candleOptions";

/**
 * 케이크 + 촛불(이미지)만 렌더하는 베이스 레이어 컴포넌트
 * - 오버레이 아래에 위치시키기 용도
 * - 불꽃/연기는 렌더하지 않음
 */
type Props = {
  cake: CakeDoc;
  className?: string;
};

export default function ReceiverCakeBase({ cake, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const menu = useMemo(() => {
    return CAKE_MENU.find((m) => m.type === cake.cakeType);
  }, [cake.cakeType]);

  const layout = CAKE_CANDLE_POSITIONS[cake.cakeType];

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;
      setScale(width / BASE_CAKE_IMAGE_WIDTH);
    };

    updateScale();

    const ro = new ResizeObserver(() => updateScale());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  if (!menu) return null;

  const slots = layout.kind === "single" ? [layout.slot] : layout.slots;

  return (
    <div
      ref={wrapRef}
      className={clsx("relative w-full max-w-[520px]", className)}
    >
      {/* 케이크 베이스 */}
      <CakeStack cakeSrc={menu.imageSrc} />

      {/* 촛불 이미지 레이어 */}
      <div className="absolute inset-0 z-10">
        {slots.map((slot) => {
          const candleId = cake.placedCandlesBySlot[slot.key] ?? null;
          if (!candleId) return null;

          const candleSrc = getCandleImageSrcById(candleId);
          if (!candleSrc) return null;

          const zOrder = PARTY_Z_ORDER[slot.key] ?? 0;

          const BASE_CANDLE_HEIGHT = 300;
          const CANDLE_BOTTOM_OFFSET = 25;

          const candleH = BASE_CANDLE_HEIGHT * scale;
          const bottomOffset = CANDLE_BOTTOM_OFFSET * scale;

          // slot(x,y)가 원의 "왼쪽 끝" 기준일 수 있으니 유틸에서 중심 보정
          const center = toCircleCenterPoint(slot);

          // center가 scale 미반영 값이라고 가정하고 여기서 scale 적용
          const leftPx = center.x * scale;
          const topPx = center.y * scale;

          // 촛불 컨테이너 top = (슬롯 중심 y) - (촛불 높이) + (바닥 여백 보정)
          const candleTop = topPx - candleH + bottomOffset;

          return (
            <div
              key={`receiver-candle-base-${slot.key}`}
              style={{
                position: "absolute",
                left: leftPx,
                top: candleTop,
                transform: "translateX(-50%)",
                zIndex: 10 + zOrder,
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <img
                src={candleSrc}
                alt=""
                draggable={false}
                style={{
                  display: "block",
                  height: candleH,
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
