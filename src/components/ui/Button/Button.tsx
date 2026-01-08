import clsx from "clsx";
import {
  BUTTON_BASE_CLASS,
  BUTTON_DISABLED_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_LABEL_CLASS,
} from "./button.styles";

export interface CommonButtonProps {
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const CommonButton = ({ label, onClick, isDisabled }: CommonButtonProps) => {
  const buttonClass = clsx(
    BUTTON_BASE_CLASS,
    isDisabled ? BUTTON_DISABLED_CLASS : BUTTON_ENABLED_CLASS
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClass}
    >
      <p className={BUTTON_LABEL_CLASS}>{label}</p>
    </button>
  );
};

export default CommonButton;
