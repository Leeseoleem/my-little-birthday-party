import { useCallback, useState } from "react";
import silenceSrc from "../assets/audio/silence.mp3";
import { getAudioSingleton } from "../utils/getAudioSingleton";

export function useAudioUnlock(storageKey = "mlbp_audio_unlocked") {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(storageKey) === "1";
  });

  const unlock = useCallback(async () => {
    if (isUnlocked) return true;

    try {
      const audio = getAudioSingleton();

      // 언락용 무음 오디오 주입
      audio.src = silenceSrc;
      audio.preload = "auto";
      audio.load();

      const prevVol = audio.volume;
      audio.volume = 0;
      audio.currentTime = 0;

      await audio.play();

      audio.pause();
      audio.currentTime = 0;
      audio.volume = prevVol;

      sessionStorage.setItem(storageKey, "1");
      setIsUnlocked(true);

      return true;
    } catch {
      return false;
    }
  }, [isUnlocked, storageKey]);

  return { isUnlocked, unlock };
}
