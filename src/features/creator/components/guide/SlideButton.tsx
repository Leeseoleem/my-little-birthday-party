import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = "prev" | "next";

interface SlideButtonProps {
  direction: Slide;
  isDisabled?: boolean;
  onClick?: () => void;
}

const SlideButton = ({ direction, isDisabled, onClick }: SlideButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="flex gap-3 px-4 py-2 rounded-lg hover:bg-gray-30 active:bg-gray-30 transition-colors"
    >
      {direction === "prev" && <ChevronLeft size={16} color="#6F6F6F" />}
      <p className="text-small text-gray-60">
        {direction === "prev" ? "이전" : "다음"}
      </p>
      {direction === "next" && <ChevronRight size={16} color="#6F6F6F" />}
    </button>
  );
};

export default SlideButton;
