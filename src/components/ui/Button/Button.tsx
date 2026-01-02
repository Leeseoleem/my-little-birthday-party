import clsx from "clsx";

interface CommonButtonProps {
  label: string;
  onClick?: () => void;
  isDisabled?: boolean; // Added optional disabled prop
}

const CommonButton = ({ label, onClick, isDisabled }: CommonButtonProps) => {
  const buttonClass = clsx(
    "flex w-full max-w-90 h-12 sm:h-14 md:h-15 justify-center items-center px-6 rounded-xl shadow-button",
    isDisabled
      ? "bg-main-disabled cursor-not-allowed"
      : "bg-main hover:bg-main-hover active:bg-main-active cursor-pointer"
  );
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClass}
    >
      <p className="text-body text-gray-0">{label}</p>
    </button>
  );
};

export default CommonButton;
