import clsx from "clsx";

import LetterPaperLayout from "../../../components/layout/frame/LetterPaperLayout";
import type { LetterPaperType } from "../../types/letterPaper.types";

export interface ReceiverLetterContentProps {
  type: LetterPaperType;
  content: string;
}

const ReceiverLetterContent = ({
  type,
  content,
}: ReceiverLetterContentProps) => {
  const areaClass = clsx(
    "flex-1 min-h-0 h-full bg-transparent resize-none border-0 text-left whitespace-pre-wrap break-words overflow-auto",
  );
  const textClass = clsx(
    type === "default" && "text-letter-default-responsive",
    type === "simple" && "text-letter-simple-responsive",
    type === "night" && "text-letter-night-responsive text-gray-0",
  );

  return (
    <LetterPaperLayout type={type}>
      <p className={clsx(areaClass, textClass)}>{content}</p>
    </LetterPaperLayout>
  );
};

export default ReceiverLetterContent;
