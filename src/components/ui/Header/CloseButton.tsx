import clsx from "clsx";
import { X } from "lucide-react";
import { buttonContainer, buttonBg } from "./button.styles";

export interface CloseButtonProps {
  ariaLabel?: string;
  onClose?: () => void; // 필요하면 외부에서 추가 동작 가능
}

export function CloseButton({ ariaLabel = "닫기", onClose }: CloseButtonProps) {
  const handleClose = () => {
    // 현재 창 닫기
    window.close();

    // onClick 함수 작성 시 여기서 호출
    onClose?.();
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      aria-label={ariaLabel}
      className={clsx(buttonContainer, buttonBg)}
    >
      <X className="text-gray-60" size={20} />
    </button>
  );
}
