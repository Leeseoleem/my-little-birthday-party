// hooks/useAudioUnlock.ts
import { useCallback, useState } from "react";
import silenceSrc from "../assets/audio/silence.mp3";

export function useAudioUnlock(storageKey = "mlbp_audio_unlocked") {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(storageKey) === "1";
  });

  const unlock = useCallback(async () => {
    if (isUnlocked) return true;

    try {
      // 임시 Audio 인스턴스 생성
      const tempAudio = new Audio();

      tempAudio.src = silenceSrc;
      tempAudio.preload = "auto";
      tempAudio.volume = 0;
      tempAudio.currentTime = 0;

      await tempAudio.play();
      tempAudio.pause();

      sessionStorage.setItem(storageKey, "1");
      setIsUnlocked(true);

      return true;
    } catch (err) {
      console.error("[useAudioUnlock] failed", err);
      return false;
    }
  }, [isUnlocked, storageKey]);

  return { isUnlocked, unlock };
}
