import type { IconType } from "react-icons";

interface ShareButtonItemProps {
  Icon: IconType;
  onClick: () => void;
  ariaLabel: string;
}

export const ShareButtonItem = ({
  onClick,
  Icon,
  ariaLabel,
}: ShareButtonItemProps) => {
  return (
    <button
      className="flex w-12 h-12 items-center justify-center rounded-full bg-main hover:bg-main-hover active:bg-main-active"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon size={24} color="#ffffff" aria-hidden="true" />
    </button>
  );
};
