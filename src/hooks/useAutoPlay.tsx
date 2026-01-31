import { useEffect, useRef } from "react";
import { useAudioWithEnded } from "./useAudioWithEnded";

interface UseAutoPlayOptions {
  src: string;
  shouldPlay: boolean;
  onEnded?: () => void;
  fallbackTimeout?: number;
  playOnce?: boolean;
}

export function useAutoPlay({
  src,
  shouldPlay,
  onEnded,
  fallbackTimeout = 18000,
  playOnce = true,
}: UseAutoPlayOptions) {
  const playedRef = useRef(false);

  const { play, audioRef } = useAudioWithEnded({
    src,
    loop: !playOnce,
    onEnded: onEnded || (() => {}),
  });

  useEffect(() => {
    if (!shouldPlay) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      return;
    }

    if (playOnce && playedRef.current) return;

    let cancelled = false;
    let fallbackTimerId: number | null = null;

    const tryPlay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (cancelled) return;

      try {
        const ok = await play();

        if (cancelled) return;

        if (ok === false) {
          console.warn("[useAutoPlay] play failed, starting fallback timer");
          fallbackTimerId = window.setTimeout(() => {
            if (cancelled) return;
            onEnded?.();
          }, fallbackTimeout);
          return;
        }

        if (playOnce) {
          playedRef.current = true;
        }
      } catch (err) {
        console.error("[useAutoPlay] exception during play", err);
        if (cancelled) return;

        fallbackTimerId = window.setTimeout(() => {
          if (cancelled) return;
          onEnded?.();
        }, fallbackTimeout);
      }
    };

    void tryPlay();

    return () => {
      cancelled = true;
      if (fallbackTimerId) window.clearTimeout(fallbackTimerId);
    };
  }, [shouldPlay, play, audioRef, onEnded, fallbackTimeout, playOnce]);
}
