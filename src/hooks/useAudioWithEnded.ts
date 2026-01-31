import { useCallback, useEffect, useRef } from "react";
import { getAudioSingleton } from "../utils/getAudioSingleton";

type UseAudioWithEndedOptions = {
  src: string;
  loop?: boolean;
  volume?: number;
  preload?: "none" | "metadata" | "auto";
  onEnded?: () => void;
  onLoop?: () => void;
};

export function useAudioWithEnded({
  src,
  loop = false,
  volume = 0.6,
  preload = "auto",
  onEnded,
  onLoop,
}: UseAudioWithEndedOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onEndedRef = useRef<UseAudioWithEndedOptions["onEnded"]>(onEnded);
  const onLoopRef = useRef<UseAudioWithEndedOptions["onLoop"]>(onLoop);

  useEffect(() => {
    onEndedRef.current = onEnded;
    onLoopRef.current = onLoop;
  }, [onEnded, onLoop]);

  // src가 변경될 때마다 오디오 재설정
  useEffect(() => {
    const audio = getAudioSingleton();

    audio.src = src;
    audio.preload = preload;
    audio.loop = false;
    audio.volume = volume;
    audio.load();

    const handleEnded = async () => {
      onEndedRef.current?.();

      if (loop) {
        onLoopRef.current?.();

        try {
          audio.currentTime = 0;
          await audio.play();
        } catch (err) {
          console.warn("[audio] loop play failed", err);
        }
      }
    };

    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src, loop, volume, preload]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      // 재생 전 currentTime 리셋 (처음부터 재생)
      audio.currentTime = 0;
      await audio.play();
      console.log("[audio] play success");
      return true;
    } catch (e) {
      console.warn("[audio] play blocked", e);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const setVol = useCallback((v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.max(0, Math.min(1, v));
  }, []);

  return { play, pause, stop, setVol, audioRef };
}
