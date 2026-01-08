import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  LONG_CANDLE_OPTIONS,
  SHORT_CANDLE_OPTIONS,
  SPECIAL_CANDLE_OPTIONS,
} from "../../../features/creator/data/candleOption.data";

import CandleTabSection from "../../../features/creator/components/CandleTabSection";
import {
  CandleOptionGroup,
  type CandleOption,
} from "../../../features/creator/components/CandleOptionGroup";
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/cake/build")({
  staticData: {
    creatorLayout: {
      isFullBleed: true,
    },
    creatorHeader: {
      value: 0.8,
      fallbackTo: "/creator/cake/select",
    },
  },
  component: CreatorCakeBuildPage,
});

function CreatorCakeBuildPage() {
  const [selectedId, setSelectedId] = useState<string>(
    LONG_CANDLE_OPTIONS[0].id
  );
  return (
    <div className="flex flex-1 flex-col justify-center">
      <BottomActionSlot hasBottomPadding={false}>
        <CandleTabSection
          pages={{
            long: (
              <CandleOptionGroup
                options={LONG_CANDLE_OPTIONS}
                value={selectedId}
                onChange={(nextId) => {
                  setSelectedId(nextId);
                }}
              />
            ),
            short: (
              <>
                {/* 짧은 초 아이템들 */}
                <button className="min-w-[120px] h-[120px] bg-gray-10 rounded-2xl">
                  Short 1
                </button>
              </>
            ),
            special: (
              <>
                {/* 특별한 초 아이템들 */}
                <button className="min-w-[120px] h-[120px] bg-gray-10 rounded-2xl">
                  Special 1
                </button>
              </>
            ),
          }}
        />
      </BottomActionSlot>
    </div>
  );
}
