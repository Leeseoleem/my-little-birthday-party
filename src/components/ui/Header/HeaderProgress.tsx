interface HeaderProgressProps {
  value: number; // 0 ~ 1
}

const HeaderProgress = ({ value }: HeaderProgressProps) => {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="h-1 w-full bg-gray-20">
      <div
        className="h-1 rounded-r bg-main transition-[width] duration-200"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
};

export default HeaderProgress;
