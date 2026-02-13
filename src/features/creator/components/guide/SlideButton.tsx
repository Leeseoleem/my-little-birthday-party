import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type Slide = "prev" | "next";

interface SlideButtonProps {
  direction: Slide;
  isDisabled?: boolean;
  onClick?: () => void;
}

const SlideButton = ({ direction, isDisabled, onClick }: SlideButtonProps) => {
  // disabled 상태에 따른 아이콘 컬러 분기
  const iconColor = isDisabled ? "#D8D3CC" : "#6F6F6F";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
        isDisabled
          ? "cursor-not-allowed pointer-events-none"
          : "cursor-pointer hover:bg-gray-30 active:bg-gray-30",
      )}
    >
      {direction === "prev" && <ChevronLeft size={16} color={iconColor} />}

      <p
        className={clsx(
          "text-small",
          isDisabled ? "text-gray-40" : "text-gray-60",
        )}
      >
        {direction === "prev" ? "이전" : "다음"}
      </p>

      {direction === "next" && <ChevronRight size={16} color={iconColor} />}
    </button>
  );
};

export default SlideButton;
