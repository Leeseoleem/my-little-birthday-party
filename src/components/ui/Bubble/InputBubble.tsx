import { motion } from "framer-motion";
import clsx from "clsx";
import type { BubbleTailPosition } from "./bubble.types";
import { BUBBLE_TAIL_CLASS } from "./bubbleTail.styles";

import { useImeComposition } from "../../../hooks/useImeComposition";
import { useLimitFeedback } from "../../../hooks/useLimitFeedback";

interface InputBubbleProps {
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  tail?: BubbleTailPosition;
}

const InputBubble = ({
  placeholder = "이 캐릭터가 건넬 생일 축하 한마디를 적어주세요!",
  maxLength = 50,
  value,
  onChange,
  tail = "left-bottom",
}: InputBubbleProps) => {
  // 공통 스타일 정의
  const inputContainerStyle =
    "flex w-full p-4 md:p-5 lg:p-6 h-[72px] md:h-[92px] lg:h-[100px] bg-gray-0 focus:outline-none rounded-sm shadow-bubble";
  const inputTextStyle =
    "text-small md:text-body lg:text-sub-title text-gray-80 break-keep placeholder:text-gray-60 resize-none";

  // IME 조합 및 길이 제한 훅 사용
  const { controls, triggerLimitFeedback } = useLimitFeedback();

  const { onCompositionStart, onCompositionEnd, isComposingRef } =
    useImeComposition();

  const tailClass = clsx(BUBBLE_TAIL_CLASS[tail]);
  return (
    <motion.textarea
      animate={controls}
      className={clsx(inputContainerStyle, inputTextStyle, tailClass)}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={(e) => {
        const rawValue = e.currentTarget.value;
        // 최대 길이 이상 넘어가는 경우를 방지
        if (rawValue.length > maxLength) {
          triggerLimitFeedback();
          return;
        }

        onChange(rawValue);
      }}
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
        if (value.length >= maxLength) {
          e.preventDefault();
          triggerLimitFeedback();
        }
      }}
    />
  );
};
export default InputBubble;
