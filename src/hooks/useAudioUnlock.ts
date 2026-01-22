// src/hooks/useAudioUnlock.ts
import { useCallback, useRef, useState } from "react";
import silenceSrc from "../assets/audio/silence.mp3";

export function useAudioUnlock(storageKey = "mlbp_audio_unlocked") {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(storageKey) === "1";
  });

  const unlock = useCallback(async () => {
    if (isUnlocked) return true;

    try {
      // HTMLAudioElement로 "실제로 play()"를 한 번 시도
      const audio = audioRef.current ?? new Audio(silenceSrc);
      audioRef.current = audio;

      audio.preload = "auto";

      // 사용자는 소리를 못 듣게 0으로 두고 잠깐 재생
      const prevVol = audio.volume;
      audio.volume = 0;
      audio.currentTime = 0;

      await audio.play();

      // 바로 정지(언락 목적)
      audio.pause();
      audio.currentTime = 0;
      audio.volume = prevVol;

      sessionStorage.setItem(storageKey, "1");
      setIsUnlocked(true);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }, [isUnlocked, storageKey]);

  return { isUnlocked, unlock };
}
