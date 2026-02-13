import clsx from "clsx";
import ReceiptLayoutHeader, {
  type ReceiptLayoutHeaderProps,
} from "./ReceiptLayoutHeader";

type ReceiptLayoutProps = {
  header: ReceiptLayoutHeaderProps;
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function ReceiptLayout(props: ReceiptLayoutProps) {
  return (
    <div
      className={clsx(
        "bg-[url('/assets/textures/paper-crumpled-white.png')]",
        "z-10 bg-no-repeat bg-center",
        // 기본은 내용 기반이 아니라 '컨테이너가 커질 수 있게' 열어두는 편이 좋음
        "w-fit", // 너비는 유지 (원하면 이것도 외부로 제어 가능)
        "flex flex-col items-start",
        "pb-6 pt-9 px-8 mdh:px-12 lgh:px-15 gap-6 shadow-floating",
        props.className,
      )}
    >
      <ReceiptLayoutHeader {...props.header} />
      <div className="w-full h-[1.5px] bg-gray-50" />
      <div className="flex flex-1">{props.children}</div>
      <div className="w-full h-[1.5px] bg-gray-50" />
      {/* 하단 영역 */}
      <div className="mt-auto flex flex-col w-full">{props.footer}</div>
    </div>
  );
}
