import CarouselLayout from "../../../../components/layout/frame/CarouselLayout";
import BottomActionSlot from "../../../../components/layout/frame/BottomActionSlot";
import CommonButton from "../../../../components/ui/Button/Button";

import type { CarouselItemType } from "../../../../components/layout/frame/CarouselLayout";
import { LETTER_PAPER_ITEMS } from "../../../types/letterPaper.types";

interface SelectSectionProps<T extends CarouselItemType = CarouselItemType> {
  type: T;
  onTypeChange: (type: T) => void;
  onClick: () => void;
}

export default function SelectSection({
  type,
  onTypeChange,
  onClick,
}: SelectSectionProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <CarouselLayout
          items={LETTER_PAPER_ITEMS}
          type={type}
          onTypeChange={onTypeChange}
        />
      </div>
      <BottomActionSlot>
        <CommonButton label="이 편지지로" onClick={onClick} />
      </BottomActionSlot>
    </div>
  );
}
