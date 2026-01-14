import { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import CakeStack from "./CakeStack";
import { CandleSlot } from "./CandleSlot";

import { CAKE_MENU } from "../../data/cakeMenu.data";
import { CAKE_CANDLE_POSITIONS } from "../../data/cake.candle-positions";
import type { CakeType } from "../../../types/cake.types";

const BASE_WIDTH = 900; // 좌표계 기준 가로 폭(고정)

export default function CakeStackWithSlots({
  cakeType,
  className,
  onSlotClick,
}: {
  cakeType: CakeType;
  className?: string;
  onSlotClick?: (index: number) => void; // 필요 없으면 제거해도 됨
}) {
  // 1) 렌더 폭을 재기 위한 래퍼 ref
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 2) 현재 렌더 폭 / 900 = scale
  const [scale, setScale] = useState(1);

  // 3) 케이크 이미지 메뉴
  const menu = useMemo(() => {
    return CAKE_MENU.find((m) => m.type === cakeType);
  }, [cakeType]);

  // 4) 케이크 타입별 좌표 레이아웃
  const layout = CAKE_CANDLE_POSITIONS[cakeType];

  // 5) ResizeObserver로 폭 변화 감지 → scale 업데이트
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;

      // 방어 로직: 0이면 계산 불가
      if (width <= 0) return;

      setScale(width / BASE_WIDTH);
    };

    updateScale();

    const ro = new ResizeObserver(() => {
      updateScale();
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // menu가 없으면 렌더 불가 (cakeType이 유효하면 사실상 발생 안 함)
  if (!menu) return null;

  return (
    <div
      ref={wrapRef}
      className={clsx("relative w-full max-w-[520px]", className)}
    >
      {/* 판 + 케이크 */}
      <CakeStack cakeSrc={menu.imageSrc} />

      {/* 슬롯 레이어: CakeStack 위에 그대로 덮는다 */}
      <div className="absolute inset-0 z-10">
        {layout.kind === "single" && (
          <CandleSlot
            left={layout.point.x}
            top={layout.point.y}
            scale={scale}
            onClick={() => onSlotClick?.(0)}
          />
        )}

        {layout.kind === "multiple" &&
          layout.points.map((p, i) => (
            <CandleSlot
              key={`${p.x}-${p.y}`}
              left={p.x}
              top={p.y}
              scale={scale}
              onClick={() => onSlotClick?.(i)}
            />
          ))}
      </div>
    </div>
  );
}
