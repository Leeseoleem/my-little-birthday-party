import type { CharacterType } from "../../types/character.types";

export const CHARACTER_PRESET: Record<
  CharacterType,
  { label: string; src: string; alt: string }
> = {
  raccoon: {
    label: "Raccoon",
    src: "/assets/characters/raccoon-profile.png",
    alt: "라쿤 프로필 이미지",
  },
  hedgehog: {
    label: "Hedgehog",
    src: "/assets/characters/hedgehog-profile.png",
    alt: "고슴도치 프로필 이미지",
  },
  cat: {
    label: "Cat",
    src: "/assets/characters/cat-profile.png",
    alt: "고양이 프로필 이미지",
  },
};
