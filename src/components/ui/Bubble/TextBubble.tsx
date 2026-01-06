import clsx from "clsx";

export type BubbleTailPosition =
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

interface TextBubbleProps {
  message: string;
  tail?: BubbleTailPosition;
}

const TextBubble = ({ message, tail = "left-bottom" }: TextBubbleProps) => {
  const tailClass = clsx(
    tail === "left-top" && "rounded-b-3xl rounded-tr-3xl",
    tail === "left-bottom" && "rounded-t-3xl rounded-br-3xl",
    tail === "right-top" && "rounded-b-3xl rounded-tl-3xl",
    tail === "right-bottom" && "rounded-t-3xl rounded-bl-3xl"
  );
  return (
    <div
      className={clsx(
        "flex p-6 h-15 bg-gray-0 items-center shadow-bubble",
        tailClass
      )}
    >
      <p className="text-sub-title text-gray-80">{message}</p>
    </div>
  );
};
export default TextBubble;
