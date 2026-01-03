import { useCanGoBack, useNavigate } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  fallbackTo?: LinkProps["to"]; // 오류시 실제로 넘어갈 페이지
  onClickBack?: () => void;
}

export const BackButton = ({ fallbackTo, onClickBack }: BackButtonProps) => {
  // 뒤로 갈 수 있는지 여부
  const canGoBack = useCanGoBack();
  // TanStack Router의 네비게이션 함수
  const navigate = useNavigate();

  const handleBack = () => {
    // 만약을 방지한 뒤로가기 함수 추가
    if (onClickBack) {
      onClickBack();
      return;
    }

    if (canGoBack) {
      window.history.back();
      return;
    }

    if (!fallbackTo) return;

    navigate({ to: fallbackTo });
  };

  return (
    <button
      className="cursor-pointer"
      type="button"
      onClick={handleBack}
      aria-label="뒤로 가기"
    >
      <ChevronLeft color="#2B2B2B" />
    </button>
  );
};
