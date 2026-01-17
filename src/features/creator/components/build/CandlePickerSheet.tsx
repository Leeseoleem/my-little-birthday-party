import BottomSheetOverlay from "./BottomSheetOverlay";
import CandleTabSection from "./CandleTabSection";
import { CandleOptionGroup } from "./CandleOptionGroup";

import {
  LONG_CANDLE_OPTIONS,
  SHORT_CANDLE_OPTIONS,
  SPECIAL_CANDLE_OPTIONS,
} from "../../data/candleOption.data";

type CandlePickerSheetProps = {
  isOpen: boolean;
  onClickBackdrop: () => void;
  selectedId: string;
  onPick: (id: string) => void;
};

export default function CandlePickerSheet({
  isOpen,
  onClickBackdrop,
  selectedId,
  onPick,
}: CandlePickerSheetProps) {
  return (
    <BottomSheetOverlay isOpen={isOpen} onClickBackdrop={onClickBackdrop}>
      <CandleTabSection
        pages={{
          long: (
            <CandleOptionGroup
              options={LONG_CANDLE_OPTIONS}
              value={selectedId}
              onChange={onPick}
            />
          ),
          short: (
            <CandleOptionGroup
              options={SHORT_CANDLE_OPTIONS}
              value={selectedId}
              onChange={onPick}
            />
          ),
          special: (
            <CandleOptionGroup
              options={SPECIAL_CANDLE_OPTIONS}
              value={selectedId}
              onChange={onPick}
            />
          ),
        }}
      />
    </BottomSheetOverlay>
  );
}
