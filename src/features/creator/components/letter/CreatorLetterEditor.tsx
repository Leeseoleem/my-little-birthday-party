import clsx from "clsx";
import { motion } from "framer-motion";

import LetterPaperLayout from "../../../../components/layout/frame/LetterPaperLayout";
import type { LetterPaperType } from "../../../types/letterPaper.types";

import { useLimitFeedback } from "../../../../hooks/useLimitFeedback";
import { useImeComposition } from "../../../../hooks/useImeComposition";

export interface CreatorLetterEditorProps {
  type: LetterPaperType;
  value: string;
  onChange: (v: string) => void;
}

const CreatorLetterEditor = ({
  type,
  value,
  onChange,
}: CreatorLetterEditorProps) => {
  const areaClass = clsx(
    "flex-1 min-h-0 w-full bg-transparent resize-none border-0 focus:outline-none focus:rounded-md text-left whitespace-pre-wrap break-words overflow-auto",
    type === "night" ? "focus-within:bg-white/20" : "focus-within:bg-white/40",
  );
  const textClass = clsx(
    type === "default" && "text-letter-default-responsive",
    type === "simple" && "text-letter-simple-responsive",
    type === "night" && "text-letter-night-responsive text-gray-0",
  );

  const { controls, triggerLimitFeedback } = useLimitFeedback();
  const { onCompositionStart, onCompositionEnd, isComposingRef } =
    useImeComposition();

  return (
    <LetterPaperLayout type={type}>
      <motion.textarea
        animate={controls}
        value={value}
        onChange={(e) => {
          const rawValue = e.currentTarget.value;
          // 최대 길이 이상 넘어가는 경우를 방지
          if (rawValue.length > 1000) {
            triggerLimitFeedback();
            return;
          }

          onChange(rawValue);
        }}
        className={clsx(areaClass, textClass)}
        maxLength={1000}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeyDown={(e) => {
          // IME 조합 중에는 아무것도 하지 않음
          if (isComposingRef.current) {
            return;
          }

          // 특수 키(Backspace, Delete, Arrow 등)는 허용
          if (e.ctrlKey || e.metaKey || e.altKey) return;

          const isPrintableKey = e.key.length === 1;
          if (!isPrintableKey) return;

          // 길이 제한에 도달했을 때만 피드백
          if (value.length >= 1000) {
            e.preventDefault();
            triggerLimitFeedback();
          }
        }}
      />
    </LetterPaperLayout>
  );
};

export default CreatorLetterEditor;
