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

type Props = {
  cakeType: CakeType;
  className?: string;

  /**
   * 슬롯별 배치된 촛불 id
   * - index 기준으로 관리 (현재 onSlotClick이 index 기반이므로)
   * - 비어있으면 undefined
   */
  placedIds: Record<number, string | undefined>;

  /**
   * 슬롯(또는 촛불)을 클릭하면 호출됨
   * - 부모는 activeIndex를 잡고, 하단 메뉴를 열면 됨
   */
  onSlotClick?: (index: number) => void;
};

export default function CakeStackWithSlots({
  cakeType,
  className,
  placedIds,
  onSlotClick,
}: Props) {
  // 렌더 폭을 재기 위한 래퍼 ref
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 현재 렌더 폭 / 900 = scale
  const [scale, setScale] = useState(1);

  // 케이크 이미지 메뉴
  const menu = useMemo(() => {
    return CAKE_MENU.find((m) => m.type === cakeType);
  }, [cakeType]);

  // 케이크 타입별 좌표 레이아웃
  const layout = CAKE_CANDLE_POSITIONS[cakeType];

  // ResizeObserver로 폭 변화 감지 → scale 업데이트
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;

      // 방어 로직: 0이면 계산 불가
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

  // single/multiple을 slots 배열로 통일해서 렌더 단순화
  const slots = layout.kind === "single" ? [layout.slot] : layout.slots;

  return (
    <div
      ref={wrapRef}
      className={clsx("relative w-full max-w-[520px]", className)}
    >
      {/* 판 + 케이크 */}
      <CakeStack cakeSrc={menu.imageSrc} />

      {/* 슬롯/촛불 레이어 */}
      <div className="absolute inset-0 z-10">
        {slots.map((slot, index) => {
          // 원 중심좌표 반환

          // 현재 슬롯에 배치된 촛불 id
          const candleId = placedIds[index];

          // 촛불 이미지 src
          const candleSrc = candleId ? getCandleImageSrcById(candleId) : null;

          // 각 촛불 별 z-index
          const zOrder = PARTY_Z_ORDER[slot.key] ?? 0;

          const BASE_CANDLE_HEIGHT = 300;
          const CANDLE_BOTTOM_OFFSET = 25;

          const candleH = BASE_CANDLE_HEIGHT * scale;
          // 슬롯 중심이 촛불 바닥에 오도록: 바닥 기준 보정
          const bottomOffset = CANDLE_BOTTOM_OFFSET * scale;

          const center = toCircleCenterPoint(slot);

          const leftPx = center.x * scale;
          const topPx = center.y * scale;

          // 촛불 컨테이너 top = (슬롯 중심 y) - (촛불 높이) + (바닥 여백 보정)
          const candleTop = topPx - candleH + bottomOffset;

          // 배치된 촛불이 있으면 촛불 이미지 표시
          if (candleSrc) {
            return (
              <div
                key={`candle-${index}`}
                style={{
                  position: "absolute",
                  left: leftPx,
                  top: candleTop,
                  transform: "translateX(-50%)", // Y 변형 제거
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
                    height: candleH, // 스케일을 사이즈에 직접 적용
                    width: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => onSlotClick?.(index)}
                  style={{
                    position: "absolute",

                    // 촛불 컨테이너의 바닥 기준 위치에서 위로 300 영역을 덮게
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",

                    // 히트박스 크기(원본 기준). 컨테이너 scale이 같이 적용됨.
                    width: 25,
                    height: 200,

                    padding: 0,
                    border: 0,
                    // background: "transparent",
                    pointerEvents: "all",
                    cursor: "pointer",
                  }}
                  aria-label={`candle-${index}`}
                />
              </div>
            );
          }

          // 배치된 촛불이 없거나 src 매핑이 실패하면 슬롯 표시
          return (
            <CandleSlot
              key={`slot-${index}`}
              left={center.x}
              top={center.y}
              scale={scale}
              onClick={() => onSlotClick?.(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
