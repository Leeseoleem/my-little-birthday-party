import clsx from "clsx";
import type { BubbleTailPosition } from "./bubble.types";
import { BUBBLE_TAIL_CLASS } from "./bubbleTail.styles";

interface TextBubbleProps {
  message: string;
  tail?: BubbleTailPosition;
}

const TextBubble = ({ message, tail = "left-bottom" }: TextBubbleProps) => {
  const tailClass = clsx(BUBBLE_TAIL_CLASS[tail]);
  return (
    <div
      className={clsx(
        "flex p-6 min-h-15 max-w-[300px] bg-gray-0 items-center shadow-bubble rounded-sm",
        tailClass
      )}
    >
      <p className="text-sub-title text-gray-80 break-keep">{message}</p>
    </div>
  );
};
export default TextBubble;
