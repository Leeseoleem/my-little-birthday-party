import clsx from "clsx";
import {
  LETTER_PAPER_PRESET,
  type LetterPaperType,
} from "../../../types/letterPaper.types";

interface LetterPaperLayoutProps {
  type: LetterPaperType;
  children: React.ReactNode;
}

export default function LetterPaperLayout({
  type,
  children,
}: LetterPaperLayoutProps) {
  const preset = LETTER_PAPER_PRESET[type];
  return (
    <section className={clsx("mx-auto w-[240px] md:w-[360px] lg:w-[480px]")}>
      <div className="relative">
        {/* 편지지 이미지 */}
        <img
          src={preset.imageSrc}
          alt={`${preset.label} letter paper`}
          className="block w-full h-auto select-none"
          draggable={false}
        />
        {/* 텍스트 영역 */}
        <div
          className={clsx(
            "absolute inset-0",
            "px-[24px] py-[48px]",
            "md:px-[42px] md:py-[84px]",
            "lg:px-[60px] lg:py-[120px]"
          )}
        >
          {/* 내용 */}
          {children}
        </div>
      </div>
    </section>
  );
}
