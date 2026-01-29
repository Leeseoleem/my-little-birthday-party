import clsx from "clsx";

const FireConfettiButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        // layout
        "flex items-center justify-center",
        "py-2 px-3 mdh:py-3 mdh:px-4 rounded-3xl",

        // base colors
        "bg-gray-0 text-gray-90",
        "border-2 border-transparent",

        // hover
        "hover:border-main-disabled",

        // active (눌림 상태)
        "active:border-main active:scale-[0.98]",

        // motion
        "transition-transform duration-200 ease-out",
      )}
    >
      <p className="text-small mdh:text-body">🎉 폭죽 터트리기</p>
    </button>
  );
};

export default FireConfettiButton;
