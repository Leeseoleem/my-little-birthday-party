import ReceiptLayout from "../../../../components/layout/frame/ReceiptLayout";
import type { ReceiptLayoutHeaderProps } from "../../../../components/layout/frame/ReceiptLayoutHeader";
import SlideButton from "./SlideButton";

type GuideSlideLayoutProps = {
  header: ReceiptLayoutHeaderProps; // 헤더 정보
  bodyTitle?: string; // 본문 타이틀/리드(선택)
  children?: React.ReactNode; // 본문(선택) - ReactNode로 뚫기
  prevButton: {
    onClick: () => void;
    disabled?: boolean;
  };
  nextButton: {
    onClick: () => void;
    disabled?: boolean;
  };
};

export default function GuideSlideLayout({
  header,
  bodyTitle,
  children,
  prevButton,
  nextButton,
}: GuideSlideLayoutProps) {
  return (
    <ReceiptLayout
      header={header}
      footer={
        <footer className="mt-auto flex justify-between items-center">
          <SlideButton
            direction="prev"
            onClick={prevButton.onClick}
            isDisabled={prevButton.disabled}
          />
          <SlideButton
            direction="next"
            onClick={nextButton.onClick}
            isDisabled={nextButton.disabled}
          />
        </footer>
      }
      className="h-[550px] mdh:h-[600px] lgh:h-[650px]"
    >
      <div className="flex flex-col w-full justify-center gap-6">
        {bodyTitle && (
          <p className="text-small mdh:text-body lgh:text-sub-title text-gray-80 whitespace-pre-line">
            {bodyTitle}
          </p>
        )}
        {children}
      </div>
    </ReceiptLayout>
  );
}
