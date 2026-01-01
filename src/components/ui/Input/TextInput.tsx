import { motion } from "framer-motion";
import { useImeComposition } from "../../../hooks/useImeComposition";
import { useLimitFeedback } from "../../../hooks/useLimitFeedback";
export interface TextInputProps {
  id?: string;
  maxLength?: number;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TextInput = ({
  id,
  maxLength = 50,
  placeholder,
  value,
  onChange,
}: TextInputProps) => {
  const { controls, triggerLimitFeedback } = useLimitFeedback();

  const { onCompositionStart, onCompositionEnd, isComposingRef } =
    useImeComposition();

  return (
    <motion.input
      animate={controls}
      id={id}
      type="text"
      placeholder={placeholder || "텍스트를 입력하세요"}
      className="w-full max-w-90 h-12 border-2 rounded-lg px-4 bg-gray-10 border-gray-40 focus:border-gray-60 focus:outline-none text-small text-gray-80 placeholder-gray-60"
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

export default TextInput;
