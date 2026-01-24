import { useEffect, useRef } from "react";
import { useAudioWithEnded } from "./useAudioWithEnded";

interface UseAutoPlayOptions {
  /** 오디오 파일 경로 */
  src: string;
  /** 재생을 트리거할 조건 (phase === "reveal" 같은) */
  shouldPlay: boolean;
  /** 재생 완료 시 콜백 (playOnce가 true일 때 주로 사용) */
  onEnded?: () => void;
  /** 재생 실패 시 폴백 타이머 (ms), 기본값 18000 */
  fallbackTimeout?: number;
  /** true: 한 번만 재생 (기본값), false: shouldPlay가 true인 동안 계속 반복 재생 */
  playOnce?: boolean;
}

/**
 * 특정 조건에서 오디오를 자동 재생하는 훅
 * - 재생 실패 시 fallback 타이머로 onEnded 호출
 * - playOnce로 재생 횟수 제어
 */
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
    loop: !playOnce, // playOnce가 false면 loop 활성화
    onEnded: onEnded || (() => {}),
  });

  useEffect(() => {
    if (!shouldPlay) {
      // shouldPlay가 false면 오디오 정지
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      return;
    }

    if (playOnce && playedRef.current) return; // playOnce일 때만 중복 방지

    let cancelled = false;
    let fallbackTimerId: number | null = null;

    const tryPlay = async () => {
      try {
        const ok = await play();

        if (cancelled) return;

        // play() 실패 → 폴백 타이머로 다음 단계
        if (ok === false) {
          fallbackTimerId = window.setTimeout(() => {
            if (cancelled) return;
            onEnded?.();
          }, fallbackTimeout);
          return;
        }

        // 재생 성공
        if (playOnce) {
          playedRef.current = true;
        }
      } catch {
        if (cancelled) return;

        // 예외 발생 → 폴백 타이머
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
