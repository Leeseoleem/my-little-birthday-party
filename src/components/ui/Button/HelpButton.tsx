import { CircleQuestionMark } from "lucide-react";

interface HelpButtonProps {
  label: string;
  onClick: () => void;
}

const HelpButton = ({ label, onClick }: HelpButtonProps) => {
  return (
    <button
      className="flex flex-row items-center gap-1 cursor-pointer hover:underline active:underline decoration-gray-60"
      onClick={onClick}
    >
      <CircleQuestionMark size={14} color="#6f6f6f" />
      <p className="text-small text-gray-60">{label}</p>
    </button>
  );
};

export default HelpButton;
