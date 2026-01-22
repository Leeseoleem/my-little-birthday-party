import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

import CandleFlame from "./CandleFlame";

import { CAKE_CANDLE_POSITIONS } from "../../creator/data/cake.candle-positions";
import { PARTY_Z_ORDER } from "../../types/cake.types";

import { BASE_CAKE_IMAGE_WIDTH } from "../../constant/assetDimensions";
import type { CakeDoc } from "../../types/cake-doc.types";

import { toCircleCenterPoint } from "../../creator/utils/toCircleCenterPoint";
import { getCandleTypeById } from "../../creator/utils/candleOptions";

/**
 * 불꽃(Flame)만 렌더하는 레이어 컴포넌트
 * - 페이지에서 오버레이보다 위(z-index)를 주기 위한 용도
 * - 케이크/촛불 이미지는 렌더하지 않음
 */
type Props = {
  cake: CakeDoc;
  className?: string;
  /**
   * 슬롯별 불꽃 On/Off를 제어하고 싶다면 외부에서 주입
   * - 없으면 기본값 true(모두 켜짐)
   */
  isOn: boolean;
};

export default function ReceiverCandleFlameLayer({
  cake,
  className,
  isOn,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

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

  const slots = layout.kind === "single" ? [layout.slot] : layout.slots;

  return (
    <div
      ref={wrapRef}
      className={clsx(
        // ReceiverCakeBase와 동일한 "크기/기준"을 맞춰야 정확히 겹침
        "relative w-full max-w-[520px] pointer-events-none",
        className,
      )}
    >
      <div className="absolute inset-0">
        {slots.map((slot) => {
          const candleId = cake.placedCandlesBySlot[slot.key] ?? null;
          if (!candleId) return null;

          const candleType = getCandleTypeById(candleId);
          if (!candleType) return null;

          const zOrder = PARTY_Z_ORDER[slot.key] ?? 0;

          const BASE_CANDLE_HEIGHT = 300;
          const CANDLE_BOTTOM_OFFSET = 25;

          const candleH = BASE_CANDLE_HEIGHT * scale;
          const bottomOffset = CANDLE_BOTTOM_OFFSET * scale;

          const center = toCircleCenterPoint(slot);

          const leftPx = center.x * scale;
          const topPx = center.y * scale;

          const candleTop = topPx - candleH + bottomOffset;

          return (
            <div
              key={`receiver-candle-flame-${slot.key}`}
              style={{
                position: "absolute",
                left: leftPx,
                top: candleTop,
                transform: "translateX(-50%)",
                zIndex: 10 + zOrder,
                overflow: "visible",
              }}
            >
              <CandleFlame
                candleType={candleType}
                candleH={candleH}
                isOn={isOn}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
