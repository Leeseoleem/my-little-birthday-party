import clsx from "clsx";
import { X } from "lucide-react";
import { buttonContainer, buttonBg } from "./button.styles";

export interface CloseButtonProps {
  ariaLabel?: string;
  onClick?: () => void;
}

export function CloseButton({ ariaLabel = "닫기", onClick }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(buttonContainer, buttonBg)}
    >
      <X className="text-gray-60" size={20} />
    </button>
  );
}
