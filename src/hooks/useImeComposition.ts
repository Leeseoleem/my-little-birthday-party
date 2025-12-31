import { useCallback, useRef } from "react";

/**
 * IME(한글/일본어/중국어) 조합 입력 상태를 추적하는 커스텀 훅
 * - ref 기반이라 리렌더링이 발생 방지
 */
export const useImeComposition = () => {
  // 현재 IME 조합 중인지 여부를 추적하는 ref
  const isComposingRef = useRef(false);

  // IME 조합 입력 시작 시 호출
  const onCompositionStart = useCallback(() => {
    // 조합 입력 시작 상태
    isComposingRef.current = true;
  }, []);

  const onCompositionEnd = useCallback(() => {
    // 조합 입력 종료 상태
    isComposingRef.current = false;
  }, []);

  return {
    isComposingRef,
    onCompositionStart,
    onCompositionEnd,
  };
};
