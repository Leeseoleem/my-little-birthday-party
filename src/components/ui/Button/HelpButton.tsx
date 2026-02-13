import { Link, type LinkProps } from "@tanstack/react-router";
import { CircleQuestionMark } from "lucide-react";

type HelpButtonProps = {
  label: string;
} & Omit<LinkProps, "children" | "className">;

const HelpButton = ({ label, ...linkProps }: HelpButtonProps) => {
  return (
    <Link
      {...linkProps}
      className="flex flex-row items-center gap-1 cursor-pointer hover:underline active:underline decoration-gray-60"
    >
      <CircleQuestionMark size={12} color="#a6a099" />
      <p className="text-caption text-gray-50">{label}</p>
    </Link>
  );
};

export default HelpButton;
