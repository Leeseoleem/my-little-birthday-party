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
        "w-full max-w-[520px]",
        "flex flex-col items-start",
        "pb-6 pt-9 px-8 mdh:px-12 lgh:px-15 gap-6 shadow-floating",
        props.className,
      )}
    >
      <ReceiptLayoutHeader {...props.header} />
      <div className="w-full h-[1.5px] bg-gray-50" />
      <div className="flex-1 min-h-0 w-full">{props.children}</div>
      <div className="w-full h-[1.5px] bg-gray-50" />
      {/* 하단 영역 */}
      <div className="mt-auto flex flex-col w-full">{props.footer}</div>
    </div>
  );
}
