import clsx from "clsx";
import Flame from "./Flame";

import { CANDLE_FLAME_META, type CandleType } from "../../types/candle.types";
import { BASE_CANDLE_IMAGE_HEIGHT } from "../../constant/assetDimensions";

interface CandleFlameProps {
  candleType: CandleType;
  candleH: number; // 실제 렌더링 높이(px)
  isOn: boolean; // 불꽃 on/off
  className?: string;
}

const CandleFlame = ({
  candleType,
  candleH,
  isOn,
  className,
}: CandleFlameProps) => {
  const { flameCenterTopPx, flameSizePx } = CANDLE_FLAME_META[candleType];

  // 촛불 실제 렌더 높이로 스케일
  const scaleByAsset = candleH / BASE_CANDLE_IMAGE_HEIGHT;

  // 불꽃 크기/위치 계산
  const flameSize = flameSizePx * scaleByAsset;
  const flameCenterTop = flameCenterTopPx * scaleByAsset;

  // 중심 기준이므로 top은 center - radius
  const flameTop = flameCenterTop - flameSize / 2;
  const flameXOffset = -50 * scaleByAsset;

  return (
    <div
      className={clsx("relative pointer-events-none select-none", className)}
      style={{
        height: candleH,
        width: "fit-content", // 이미지 폭 자동
      }}
    >
      {/* 불꽃 + 연기 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateX(${flameXOffset}px)`,
        }}
      >
        <Flame isOn={isOn} size={flameSize} top={flameTop} />
      </div>
    </div>
  );
};

export default CandleFlame;
