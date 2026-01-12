import ProfileBubble from "./ProfileBubble";
import type { CharacterType } from "../../types/character.types";

// 캐릭터 별 입력창
export interface GuestDialogueValue {
  value: string;
  onChange: (next: string) => void;
}

export type GuestDialogueMap = Record<CharacterType, GuestDialogueValue>;

interface GuestDialogueSectionProps {
  dialogues: GuestDialogueMap;
}

const CHARACTER_ORDER: CharacterType[] = ["raccoon", "cat", "hedgehog"];

export function GuestDialogueSection({ dialogues }: GuestDialogueSectionProps) {
  return (
    <section className="flex-1 flex flex-col gap-6 mdh:gap-10 lgh:gap-15 justify-center">
      {CHARACTER_ORDER.map((type) => {
        const dialogue = dialogues[type];

        return (
          <ProfileBubble
            key={type}
            characterType={type}
            value={dialogue.value}
            onChange={dialogue.onChange}
          />
        );
      })}
    </section>
  );
}
