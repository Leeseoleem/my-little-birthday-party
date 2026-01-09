import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { buttonBg } from "./button.styles";

export const ExitButton = ({
  onClick,
  label = "메인으로",
}: {
  onClick: () => void;
  label?: string;
}) => {
  return (
    <button
      aria-label={label}
      className={clsx("flex flex-row items-center gap-3 h-6 px-1", buttonBg)}
      onClick={onClick}
    >
      <ArrowLeft className="text-gray-60" size={20} />
      <p className="text-small text-gray-60">{label}</p>
    </button>
  );
};
