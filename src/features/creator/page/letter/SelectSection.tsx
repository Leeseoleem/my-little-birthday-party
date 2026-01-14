import CarouselLayout from "../../../../components/layout/frame/CarouselLayout";

import type { CarouselItemType } from "../../../../components/layout/frame/CarouselLayout";
import { LETTER_PAPER_ITEMS } from "../../../types/letterPaper.types";

interface SelectSectionProps<T extends CarouselItemType = CarouselItemType> {
  type: T;
  onTypeChange: (type: T) => void;
  onItemClick: () => void;
}

export default function SelectSection({
  type,
  onTypeChange,
  onItemClick,
}: SelectSectionProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <CarouselLayout
          items={LETTER_PAPER_ITEMS}
          type={type}
          onTypeChange={onTypeChange}
          enableHoverScale
          onItemClick={onItemClick}
        />
      </div>
    </div>
  );
}
