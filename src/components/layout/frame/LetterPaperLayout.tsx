import clsx from "clsx";
import {
  LETTER_PAPER_PRESET,
  type LetterPaperType,
} from "../../../features/types/letterPaper.types";

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
    <section className="flex-1 flex min-h-0 overflow-hidden justify-center items-center py-8">
      <div className="relative h-full w-auto">
        <img
          src={preset.imageSrc}
          alt={`${preset.label} letter paper`}
          className="block max-h-full w-auto object-contain drop-shadow-md drop-shadow-black/30"
          draggable={false}
        />
        <div
          className={clsx(
            "absolute inset-0 flex flex-col items-start justify-start",
            // 이미지(600x850) 대비 비율 패딩: 이미지 크기에 따라 자동 스케일
            "px-[15%] pt-[24%] pb-[15%]"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
