import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

export type CandleOption = {
  id: string;
  label: string;
  imageSrc: string;
};

interface CandleOptionGroupProps {
  options: CandleOption[];
  value: string;
  onChange: (next: string) => void;
  isDisabled?: boolean;
}

export function CandleOptionGroup({
  options,
  value,
  onChange,
  isDisabled = false,
}: CandleOptionGroupProps) {
  return (
    <RadioGroup.Root
      aria-label="초 옵션 선택"
      value={value}
      onValueChange={onChange}
      disabled={isDisabled}
      className={clsx(
        "flex flex-row items-stretch justify-around gap-6",
        "w-full"
      )}
    >
      {options.map((opt) => (
        <RadioGroup.Item
          key={opt.id}
          value={opt.id}
          className={clsx(
            // 아이템 기본 레이아웃
            "relative overflow-hidden rounded-lg bg-gray-10",
            // 아이템 크기
            "w-[160px] md:w-[220px] lg:w-[350px]",
            "h-[160px] md:h-[220px] lg:h-[350px]",
            "flex flex-col items-center justify-center",
            // 선택 상태
            "data-[state=checked]:bg-main-disabled data-[state=checked]:border-4 data-[state=checked]:border-main",
            // 비선택 상태에서도 border를 부여해 아이템 크기 맞춤
            "border-4 border-gray-10",
            // 포커스(키보드 접근성)
            "outline-none focus-visible:ring-2 focus-visible:ring-main",
            // 비활성화
            "disabled:opacity-50 disabled:pointer-events-none"
          )}
        >
          <div className="flex-1 w-full h-full flex items-center justify-center p-3 md:p-4 lg:p-6">
            <img
              src={opt.imageSrc}
              alt={opt.label}
              draggable={false}
              className="block max-h-full max-w-full object-contain select-none"
            />
          </div>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
