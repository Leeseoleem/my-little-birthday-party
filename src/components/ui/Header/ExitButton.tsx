import { ArrowLeft } from "lucide-react";

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
      className="flex flex-row items-center gap-3"
      onClick={onClick}
    >
      <ArrowLeft className="text-gray-60" />
      <p className="text-small text-gray-60">{label}</p>
    </button>
  );
};
