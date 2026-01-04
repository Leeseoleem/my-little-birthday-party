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
