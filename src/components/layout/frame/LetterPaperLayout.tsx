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
            "px-[32px] pt-[80px] pb-[40px]",
            "md:px-[48px] md:pt-[100px] md:pb-[50px]",
            "lg:px-[60px] lg:pt-[120px] lg:pb-[60px]"
          )}
          style={{
            maxHeight: "fit-content",
            height: "auto",
            aspectRatio: "600/850", // 편지지 이미지의 실제 비율
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
