import clsx from "clsx";

type CandleSlotProps = {
  left: number; // 원본 기준 px (900px 좌표계)
  top: number; // 원본 기준 px (top 기준)
  scale: number; // renderedWidth / 900
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

export const CandleSlot = ({
  left,
  top,
  scale,
  onClick,
  isActive = false,
  disabled = false,
}: CandleSlotProps) => {
  const size = 25 * scale;

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={clsx(
        "absolute",
        "z-30",
        // 크기는 무조건 고정 25px
        "box-border rounded-full",
        "border border-dashed",
        "transition-colors duration-200 ease-out",
        disabled && "cursor-not-allowed border-gray-40 bg-gray-20",
        !disabled &&
          !isActive &&
          "cursor-pointer border-gray-80 bg-gray-30 hover:bg-main/10 active:bg-main/20",
        !disabled && isActive && "cursor-pointer border-main bg-main/20"
      )}
      style={{
        width: size,
        height: size,
        // 위치만 스케일 적용
        left: left * scale,
        top: top * scale,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
