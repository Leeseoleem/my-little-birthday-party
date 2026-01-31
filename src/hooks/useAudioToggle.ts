// hooks/useAudioToggle.ts
import { useState, useCallback, useEffect, useRef } from "react";
import { useAudioUnlock } from "./useAudioUnlock";
import { getAudioSingleton } from "../utils/getAudioSingleton";

interface UseAudioToggleOptions {
  src: string;
  loop?: boolean;
  volume?: number;
  onEnded?: () => void;
}

export function useAudioToggle({
  src,
  loop = false,
  volume = 0.6,
  onEnded,
}: UseAudioToggleOptions) {
  const { unlock, isUnlocked } = useAudioUnlock();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onEndedRef = useRef(onEnded);
  const setupDoneRef = useRef(false); // 중복 설정 방지

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  // 오디오 설정 (한 번만 실행)
  useEffect(() => {
    // 이미 설정했으면 스킵
    if (setupDoneRef.current) return;
    setupDoneRef.current = true;

    const audio = getAudioSingleton();

    audio.src = src;
    audio.preload = "auto";
    audio.loop = loop;
    audio.volume = volume;

    const handleCanPlay = () => {
      setIsReady(true);
      console.log("[useAudioToggle] audio ready");
    };

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
      onEndedRef.current?.();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.load();

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      setupDoneRef.current = false; // cleanup 시 리셋
    };
  }, [src, loop, volume]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !isReady) {
      console.warn("[useAudioToggle] audio not ready");
      return;
    }

    // 언락 안 됐으면 먼저 unlock
    if (!isUnlocked) {
      console.log("[useAudioToggle] unlocking...");
      const success = await unlock();
      if (!success) {
        console.warn("[useAudioToggle] unlock failed");
        return;
      }
      console.log("[useAudioToggle] unlock success");
    }

    // 재생 중이면 일시정지
    if (isPlaying) {
      console.log("[useAudioToggle] pausing");
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // 재생
    try {
      console.log("[useAudioToggle] playing", {
        currentTime: audio.currentTime,
        volume: audio.volume,
        paused: audio.paused,
        src: audio.src,
      });

      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);

      console.log("[useAudioToggle] play success", {
        currentTime: audio.currentTime,
        volume: audio.volume,
        paused: audio.paused,
      });
    } catch (err) {
      console.error("[useAudioToggle] play failed", err);
      setIsPlaying(false);
    }
  }, [isReady, isUnlocked, unlock, isPlaying]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isReady || !isUnlocked) {
      console.warn("[useAudioToggle] play conditions not met", {
        hasAudio: !!audio,
        isReady,
        isUnlocked,
      });
      return false;
    }

    try {
      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch (err) {
      console.error("[useAudioToggle] play error", err);
      setIsPlaying(false);
      return false;
    }
  }, [isReady, isUnlocked]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    isUnlocked,
    isReady,
    toggle,
    play,
    pause,
  };
}
