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
        "flex justify-center items-center rounded-full w-6 h-6",
        direction === "left" ? "pr-0.5" : "pl-0.5",
        isDisabled
          ? "bg-main-disabled cursor-not-allowed"
          : "bg-main hover:bg-main-hover active:bg-main-active cursor-pointer"
      )}
    >
      {direction === "left" ? (
        <ChevronLeft size={14} className="text-gray-0" />
      ) : (
        <ChevronRight size={14} className="text-gray-0" />
      )}
    </button>
  );
};
export default CarouselArrowButton;
