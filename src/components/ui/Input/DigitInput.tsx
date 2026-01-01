import clsx from "clsx";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useLimitFeedback } from "../../../hooks/useLimitFeedback";

interface DigitInputProp {
  id?: string; // FormField가 내려주는 id를 받음
  value: string;
  onChange: (newValue: string) => void;
  isInvalid?: boolean;

  // 조합 컴포넌트(BirthDateInput)가 포커스 이동을 제어할 수 있도록 이벤트를 열어둠
  onFilled?: () => void; // 1글자 입력 완료 시 호출
  onBackspaceOnEmpty?: () => void; // 빈 상태에서 백스페이스 누를 때 호출 (선택)
}

const DigitInput = forwardRef<HTMLInputElement, DigitInputProp>(
  (
    { id, value, onChange, isInvalid = false, onFilled, onBackspaceOnEmpty },
    ref
  ) => {
    const { controls, triggerLimitFeedback } = useLimitFeedback();

    return (
      <motion.input
        id={id}
        ref={ref}
        className={clsx(
          "w-15 h-15 text-center border-2 rounded-lg focus:outline-none text-small text-gray-80 placeholder-gray-60",
          isInvalid
            ? "border-main focus:border-main-active bg-main-disabled"
            : "border-gray-40 focus:border-gray-60 bg-gray-10"
        )}
        animate={controls}
        placeholder="-"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value}
        onKeyDown={(e) => {
          // 빈 칸에서 backspace면 이전 칸으로 이동시키는 용도
          if (e.key === "Backspace" && value === "") {
            onBackspaceOnEmpty?.();
          }
        }}
        onChange={(e) => {
          const rawValue = e.target.value;

          // 숫자만 남김
          const onlyNumber = rawValue.replace(/[^0-9]/g, "");

          // 한 글자 제한
          const nextValue = onlyNumber.slice(0, 1);

          // 입력이 규칙에 의해 잘렸다면 피드백
          if (rawValue !== nextValue) {
            triggerLimitFeedback();
          }

          onChange(nextValue);

          // 1글자로 확정되는 순간(즉, 입력 완료) 다음 칸으로 넘기기 위한 신호
          if (nextValue.length === 1) {
            onFilled?.();
          }
        }}
      />
    );
  }
);

DigitInput.displayName = "DigitInput";

export default DigitInput;
