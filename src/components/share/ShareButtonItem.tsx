import type { ReactElement } from "react";

interface ShareButtonItemProps {
  onClick: () => void;
  icon: ReactElement;
  ariaLabel: string;
}

export const ShareButtonItem = ({
  onClick,
  icon,
  ariaLabel,
}: ShareButtonItemProps) => {
  return (
    <button
      className="flex w-12 h-12 items-center justify-center rounded-full bg-main hover:bg-main-hover active:bg-main-active"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};
