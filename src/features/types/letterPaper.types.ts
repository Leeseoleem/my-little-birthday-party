import type { CarouselItem } from "../../components/layout/frame/CarouselLayout";

export type LetterPaperType = "default" | "simple" | "night";

export const LETTER_PAPER_PRESET: Record<
  LetterPaperType,
  { label: string; imageSrc: string }
> = {
  default: {
    label: "Default",
    imageSrc: "/assets/letter-papers/letter-default.png",
  },
  simple: {
    label: "Simple",
    imageSrc: "/assets/letter-papers/letter-simple.png",
  },
  night: { label: "Night", imageSrc: "/assets/letter-papers/letter-night.png" },
};

export const LETTER_PAPER_ITEMS: CarouselItem[] = (
  Object.entries(LETTER_PAPER_PRESET) as [
    LetterPaperType,
    { label: string; imageSrc: string },
  ][]
).map(([type, preset]) => ({
  type, // "default" | "simple" | "night"
  imageSrc: preset.imageSrc,
}));

/**
 * DB에 저장되는 편지 데이터 구조
 */
export type LetterData = {
  paperType: LetterPaperType; // "default" | "simple" | "night"
  content: string; // 실제 편지 내용 (textarea 입력값)
};
