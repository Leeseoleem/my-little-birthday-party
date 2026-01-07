import InputBubble from "../../../components/ui/Bubble/InputBubble";
import type { CharacterType } from "../../types/character.types";
import { CHARACTER_PRESET } from "../data/characterProfile.data";

interface ProfileBubbleProps {
  value: string;
  onChange: (value: string) => void;
  characterType?: CharacterType;
}

const ProfileBubble = ({
  value,
  onChange,
  characterType = "raccoon",
}: ProfileBubbleProps) => {
  return (
    <div className="flex flex-row gap-6">
      <img
        className="w-[50px] h-[50px] md:w-[64px] md:h-[64px] lg:w-[80px] lg:h-[80px] rounded-full object-cover"
        src={CHARACTER_PRESET[characterType].src}
        alt={CHARACTER_PRESET[characterType].alt}
      />
      <InputBubble tail="left-top" value={value} onChange={onChange} />
    </div>
  );
};

export default ProfileBubble;
