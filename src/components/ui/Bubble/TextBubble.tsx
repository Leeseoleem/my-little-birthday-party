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
    tail === "left-top" && "rounded-b-4xl rounded-tr-4xl",
    tail === "left-bottom" && "rounded-t-4xl rounded-br-4xl",
    tail === "right-top" && "rounded-b-4xl rounded-tl-4xl",
    tail === "right-bottom" && "rounded-t-4xl rounded-bl-4xl"
  );
  return (
    <div
      className={clsx(
        "flex p-6 min-h-15 max-w-[300px] bg-gray-0 items-center shadow-bubble",
        tailClass
      )}
    >
      <p className="text-sub-title text-gray-80 break-keep">{message}</p>
    </div>
  );
};
export default TextBubble;
