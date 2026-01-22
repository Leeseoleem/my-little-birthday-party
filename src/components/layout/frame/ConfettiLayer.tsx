import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import type { CreateTypes } from "canvas-confetti";

export type ConfettiLayerHandle = {
  // 화면 중앙에서 축하 컨페티를 한 번 터뜨립니다.
  fire: () => Promise<void>;
};

const ConfettiLayer = forwardRef<ConfettiLayerHandle>(
  function ConfettiLayer(_props, ref) {
    // canvas-confetti 인스턴스(함수)를 저장합니다.
    const confettiRef = useRef<CreateTypes | null>(null);

    // react-canvas-confetti는 onInit에서 confetti 인스턴스를 제공합니다.
    // (refConfetti prop이 아니라 onInit이 공식 API입니다.)
    const handleInit = useCallback(
      ({ confetti }: { confetti: CreateTypes }) => {
        confettiRef.current = confetti;
      },
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        async fire() {
          const confetti = confettiRef.current;
          if (!confetti) return;

          const isMobile = window.innerWidth < 768;

          confetti({
            particleCount: isMobile ? 70 : 140, // 모바일 성능 고려
            spread: 90, // 넓게 퍼짐
            startVelocity: 45, // 폭발감
            gravity: 0.9, // 낙하감
            decay: 0.9, // 감속
            scalar: 1.0, // 크기
            origin: { x: 0.5, y: 0.5 }, // 화면 중앙
          });
        },
      }),
      [],
    );

    return (
      <ReactCanvasConfetti
        // 인스턴스 받는 공식 콜백
        onInit={handleInit}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // 클릭 방해 방지
          zIndex: 50,
        }}
      />
    );
  },
);

export default ConfettiLayer;
