import clsx from "clsx";
import { Headphones, HeadphoneOff } from "lucide-react";
import { buttonContainer, buttonBg } from "./button.styles";

export interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicButton({ isPlaying, onToggle }: MusicButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "음악 끄기" : "음악 재생"}
      className={clsx(buttonContainer, buttonBg)}
    >
      {isPlaying ? (
        <Headphones className="text-main" size={20} />
      ) : (
        <HeadphoneOff className="text-main" size={20} />
      )}
    </button>
  );
}
