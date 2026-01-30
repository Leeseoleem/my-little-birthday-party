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
            const HIT_W = 25;
            const HIT_H = 200;

            const hitW = HIT_W * scale;
            const hitH = HIT_H * scale;

            return (
              <div key={`candle-${slotKey}`}>
                <div
                  style={{
                    position: "absolute",
                    left: leftPx,
                    top: candleTop,
                    transform: "translateX(-50%)",
                    zIndex: 10 + zOrder,
                    overflow: "visible",
                    pointerEvents: "none", // 이미지는 클릭 막고
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

                <button
                  type="button"
                  onClick={() => onSlotClick?.(slotKey)}
                  aria-label={`candle-${slotKey}`}
                  style={{
                    position: "absolute",
                    left: leftPx,
                    top: topPx, // 슬롯 중심(y) 기준
                    transform: "translate(-50%, -100%)", // 위로 세워진 촛불 방향으로 히트박스 올림
                    width: hitW,
                    height: hitH,
                    padding: 0,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    zIndex: 20 + zOrder, // 이미지보다 위
                    // 모바일 터치 안정화(선택)
                    touchAction: "manipulation",
                  }}
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
