import { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import CakeStack from "./CakeStack";
import { CandleSlot } from "./CandleSlot";

import { BASE_CAKE_IMAGE_WIDTH } from "../../../constant/assetDimensions";
import { CAKE_MENU } from "../../data/cakeMenu.data";
import { CAKE_CANDLE_POSITIONS } from "../../data/cake.candle-positions";
import { PARTY_Z_ORDER, type CakeType } from "../../../types/cake.types";

import { toCircleCenterPoint } from "../../utils/toCircleCenterPoint";
import { getCandleImageSrcById } from "../../utils/candleOptions";
import type { PlacedCandlesBySlot } from "../../../types/cake-doc.types"; // 너희 실제 경로로 조정

type Props = {
  cakeType: CakeType;
  className?: string;

  /**
   * 슬롯 키별 배치된 촛불 옵션 id 또는 null
   * - DB에 저장되는 구조와 동일
   */
  placedBySlot: PlacedCandlesBySlot;

  /**
   * 슬롯(또는 촛불)을 클릭하면 호출됨
   * - 부모는 activeSlotKey를 잡고, 하단 메뉴를 열면 됨
   */
  onSlotClick?: (slotKey: string) => void;
};

export default function CakeStackWithSlots({
  cakeType,
  className,
  placedBySlot,
  onSlotClick,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const menu = useMemo(() => {
    return CAKE_MENU.find((m) => m.type === cakeType);
  }, [cakeType]);

  const layout = CAKE_CANDLE_POSITIONS[cakeType];

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;
      setScale(width / BASE_CAKE_IMAGE_WIDTH);
    };

    updateScale();

    const ro = new ResizeObserver(() => {
      updateScale();
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  if (!menu) return null;

  // single/multiple을 slots 배열로 통일
  const slots = layout.kind === "single" ? [layout.slot] : layout.slots;

  return (
    <div
      ref={wrapRef}
      className={clsx("relative w-full max-w-[520px]", className)}
    >
      <CakeStack cakeSrc={menu.imageSrc} />

      <div className="absolute inset-0 z-10">
        {slots.map((slot) => {
          // slot.key가 DB key와 동일한 식별자
          const slotKey = slot.key;

          // 현재 슬롯에 배치된 촛불 id (DB 구조 그대로)
          const candleId = placedBySlot[slotKey] ?? null;

          const candleSrc = candleId ? getCandleImageSrcById(candleId) : null;

          const zOrder = PARTY_Z_ORDER[slotKey] ?? 0;

          const BASE_CANDLE_HEIGHT = 300;
          const CANDLE_BOTTOM_OFFSET = 25;

          const candleH = BASE_CANDLE_HEIGHT * scale;
          const bottomOffset = CANDLE_BOTTOM_OFFSET * scale;

          const center = toCircleCenterPoint(slot);

          const leftPx = center.x * scale;
          const topPx = center.y * scale;

          const candleTop = topPx - candleH + bottomOffset;

          if (candleSrc) {
            return (
              <div
                key={`candle-${slotKey}`}
                style={{
                  position: "absolute",
                  left: leftPx,
                  top: candleTop,
                  transform: "translateX(-50%)",
                  zIndex: 10 + zOrder,
                  overflow: "visible",
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
                    pointerEvents: "none",
                  }}
                />

                <button
                  type="button"
                  onClick={() => onSlotClick?.(slotKey)}
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    width: 25,
                    height: 200,
                    padding: 0,
                    border: 0,
                    pointerEvents: "all",
                    cursor: "pointer",
                  }}
                  aria-label={`candle-${slotKey}`}
                />
              </div>
            );
          }

          return (
            <CandleSlot
              key={`slot-${slotKey}`}
              left={center.x}
              top={center.y}
              scale={scale}
              onClick={() => onSlotClick?.(slotKey)}
            />
          );
        })}
      </div>
    </div>
  );
}
