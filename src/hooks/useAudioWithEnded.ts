import { useCallback, useEffect, useRef } from "react";

type UseAudioWithEndedOptions = {
  src: string;

  // true면 "수동 루프"를 실행합니다.
  // 즉, loop=false로 두고 ended에서 다시 play() 해서 무한 반복을 만들며,
  // 그 과정에서 onEnded도 매 회차마다 호출됩니다.
  loop?: boolean;

  volume?: number; // 0~1
  preload?: "none" | "metadata" | "auto";

  // 트랙이 끝났을 때 실행할 로직
  onEnded?: () => void;

  // loop=true(수동 루프)일 때, 다시 시작하기 직전에 실행할 로직
  // (예: 다음 곡으로 넘어가기, phase 변경, 카운트 증가 등)
  onLoop?: () => void;
};

/**
 * useAudioWithEnded
 *
 * - HTMLAudioElement를 생성/정리하고
 * - play/pause/stop 제어를 제공하며
 * - 트랙 종료(ended) 시 콜백을 실행합니다.
 * - loop=true를 주면 "수동 루프"로 무한 반복을 구현합니다.
 */
export function useAudioWithEnded({
  src,
  loop = false,
  volume = 0.6,
  preload = "auto",
  onEnded,
  onLoop,
}: UseAudioWithEndedOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 최신 콜백을 이벤트 핸들러에서 안전하게 호출하기 위해 ref로 보관
  const onEndedRef = useRef<UseAudioWithEndedOptions["onEnded"]>(onEnded);
  const onLoopRef = useRef<UseAudioWithEndedOptions["onLoop"]>(onLoop);

  useEffect(() => {
    onEndedRef.current = onEnded;
    onLoopRef.current = onLoop;
  }, [onEnded, onLoop]);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = preload;

    // "진짜 loop"는 ended가 안정적으로 안 잡히는 경우가 있어서,
    // loop=true가 필요할 때는 아래에서 "수동 루프"로 구현합니다.
    audio.loop = false;
    audio.volume = volume;

    const handleEnded = async () => {
      // 1) 끝났을 때 로직
      onEndedRef.current?.();

      // 2) 무한 반복이 필요하면 수동으로 다시 재생
      if (loop) {
        onLoopRef.current?.();

        try {
          audio.currentTime = 0;
          await audio.play(); // 정책/환경에 따라 실패할 수 있음
        } catch {
          // 실패 시에는 조용히 무시하거나,
          // 필요하면 외부에서 "재생 버튼" UI를 띄우도록 신호를 주는 구조로 확장 가능
        }
      }
    };

    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [src, loop, volume, preload]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
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

  return { play, pause, stop, setVol };
}
