import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselArrowButtonProps {
  direction: "left" | "right";
  onClick?: () => void;
  isDisabled?: boolean; // Optional disabled prop
}

const CarouselArrowButton = ({
  direction,
  onClick,
  isDisabled,
}: CarouselArrowButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={direction === "left" ? "이전" : "다음"}
      className={clsx(
        "flex justify-center items-center rounded-full w-9 h-9",
        direction === "left" ? "pr-1" : "pl-1",
        isDisabled
          ? "bg-main-disabled cursor-not-allowed"
          : "bg-main hover:bg-main-hover active:bg-main-active cursor-pointer"
      )}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} className="text-gray-0" />
      ) : (
        <ChevronRight size={20} className="text-gray-0" />
      )}
    </button>
  );
};
export default CarouselArrowButton;
