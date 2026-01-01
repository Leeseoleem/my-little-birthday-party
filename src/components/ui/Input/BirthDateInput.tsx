import { useEffect, useRef, useState } from "react";
import DigitInput from "./DigitInput";

interface BirthDateInputProps {
  value: string; // "MMDD" 형태, 예: "0101" 또는 ""
  onChange: (value: string) => void;
  isInvalid?: boolean;
  onComplete?: (value: string) => void; // 4칸 전부 입력 시 호출
}

// value를 4칸으로 쪼개 렌더링
const toDigits = (v: string) => [
  v?.[0] ?? "",
  v?.[1] ?? "",
  v?.[2] ?? "",
  v?.[3] ?? "",
];

const BirthDateInput = ({
  value,
  onChange,
  isInvalid = false,
  onComplete,
}: BirthDateInputProps) => {
  // 내부 전용 digit 배열
  const [digitsState, setDigitsState] = useState<string[]>(() =>
    toDigits(value)
  );

  // 외부 value가 바뀌면 내부 상태도 동기화(예: 폼 리셋, 초기값 주입)
  useEffect(() => {
    setDigitsState(toDigits(value));
  }, [value]);

  // 4칸 ref 배열 준비
  // 예시: const inputRefs = [ ref0, ref1, ref2, ref3 ];
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusAt = (index: number) => {
    // 해당하는 index에 focus
    inputRefs.current[index]?.focus();
  };

  const blurAt = (index: number) => {
    // 해당하는 index로부터 blur
    inputRefs.current[index]?.blur();
  };

  // 특정 칸의 값 변경 시 전체 value 재생성
  const setDigitAt = (index: number, digit: string) => {
    setDigitsState((prev) => {
      const next = [...prev];
      next[index] = digit;

      return next;
    });
  };

  useEffect(() => {
    const isComplete = digitsState.every((d) => d.length === 1);
    if (isComplete) {
      const completedValue = digitsState.join("");
      onChange(completedValue); // 여기서만 문자열 생성
      onComplete?.(completedValue);
    }
  }, [digitsState, onChange, onComplete]);

  return (
    <div className="flex flex-row gap-4 items-center">
      {digitsState.map((digit, idx) => (
        <DigitInput
          key={idx}
          ref={(inputEl) => {
            inputRefs.current[idx] = inputEl;
          }}
          value={digit}
          onChange={(newValue) => {
            setDigitAt(idx, newValue);
          }}
          isInvalid={isInvalid} // 전체 에러 상태 전달
          onFilled={() => {
            // 마지막 인덱스일 경우 블러 처리
            if (idx === 3) {
              blurAt(idx);
              return;
            }
            // 다음 칸으로 포커스 넘김
            focusAt(idx + 1);
          }}
          onBackspaceOnEmpty={() => {
            if (idx > 0) {
              focusAt(idx - 1);
            }
          }}
        />
      ))}
    </div>
  );
};

export default BirthDateInput;
