import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  LETTER_PAPER_PRESET,
  type LetterPaperType,
} from "../../../features/types/letterPaper.types";

interface LetterPaperLayoutProps {
  type: LetterPaperType;
  children: React.ReactNode;
}

// 원본 편지지 사이즈
const BASE_W = 600;
const BASE_H = 900;

// 원본 편지지 기반 내부 패딩값
const BASE_PAD_X = 80;
const BASE_PAD_Y = 120;

export default function LetterPaperLayout({
  type,
  children,
}: LetterPaperLayoutProps) {
  const preset = LETTER_PAPER_PRESET[type];

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const update = () => {
      const rect = img.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) return;

      const containerW = rect.width;
      const containerH = rect.height;

      // object-contain 로직: 비율 유지하며 컨테이너에 맞춤
      const aspectRatio = BASE_W / BASE_H;
      const containerAspect = containerW / containerH;

      let actualW, actualH;

      if (containerAspect > aspectRatio) {
        // 세로 기준으로 맞춰짐 (위아래 꽉 참, 좌우 여백)
        actualH = containerH;
        actualW = actualH * aspectRatio;
      } else {
        // 가로 기준으로 맞춰짐 (좌우 꽉 참, 위아래 여백)
        actualW = containerW;
        actualH = actualW / aspectRatio;
      }

      setImgSize({ width: actualW, height: actualH });
      setScale(actualW / BASE_W);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(img);

    img.addEventListener("load", update);

    return () => {
      ro.disconnect();
      img.removeEventListener("load", update);
    };
  }, [preset.imageSrc]);

  // 내부 패딩값
  const paddingStyle = useMemo<React.CSSProperties>(() => {
    return {
      paddingLeft: BASE_PAD_X * scale,
      paddingRight: BASE_PAD_X * scale,
      paddingTop: BASE_PAD_Y * scale,
      paddingBottom: BASE_PAD_Y * scale,
    };
  }, [scale]);

  // 오버레이를 실제 이미지 크기에 맞추기
  const overlayStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: imgSize.width,
      height: imgSize.height,
    };
  }, [imgSize]);

  return (
    <section className="min-h-0 h-full flex justify-center items-center p-4 mdh:p-6 overflow-hidden">
      <div className="relative h-full flex items-center justify-center">
        <img
          ref={imgRef}
          src={preset.imageSrc}
          alt={`${preset.label} letter paper`}
          draggable={false}
          className="block h-full w-auto max-w-full object-contain drop-shadow-md drop-shadow-black/30"
        />

        <div
          className="absolute flex flex-col justify-center"
          style={{ ...overlayStyle, ...paddingStyle }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
