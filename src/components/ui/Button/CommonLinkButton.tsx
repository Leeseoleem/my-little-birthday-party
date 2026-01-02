import clsx from "clsx";
import { Link, type LinkProps } from "@tanstack/react-router";
import {
  BUTTON_BASE_CLASS,
  BUTTON_DISABLED_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_LABEL_CLASS,
} from "./button.styles";

type CommonLinkButtonProps = {
  label: string;
  isDisabled?: boolean;
} & Omit<LinkProps, "children" | "className">;

export default function CommonLinkButton({
  label,
  isDisabled,
  ...linkProps
}: CommonLinkButtonProps) {
  const linkClass = clsx(
    BUTTON_BASE_CLASS,
    isDisabled ? BUTTON_DISABLED_CLASS : BUTTON_ENABLED_CLASS
  );

  return (
    <Link
      {...linkProps}
      className={clsx(linkClass, isDisabled && "pointer-events-none")}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
    >
      <p className={BUTTON_LABEL_CLASS}>{label}</p>
    </Link>
  );
}
