// components/header/AppHeader.tsx
import type { ReactNode } from "react";
import HeaderProgress from "./HeaderProgress";

interface AppHeaderProps {
  left?: ReactNode;
  title?: ReactNode;
  right?: ReactNode;

  // progress가 있으면 진행바 헤더, 없으면 기본 헤더
  progress?: {
    value: number; // 0 ~ 1
  };

  // 내부를 컨테이너 폭에 맞출지 여부
  container?: boolean;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function AppHeader({
  left,
  title,
  right,
  progress,
  container = true,
}: AppHeaderProps) {
  return (
    <header className="w-full bg-gray-10/80 border-b border-gray-20 backdrop-blur-md">
      <div className={container ? "mx-auto w-full max-w-[1024px]" : "w-full"}>
        <div className="w-full px-4">
          <div className="flex h-14 items-center justify-between">
            {/* left 요소: ex) 뒤로 가기 */}
            <div className="flex items-center justify-start">{left}</div>

            {/* center (기본 요소) */}
            <div className="flex-1 text-center">
              {title ? (
                <div className="text-body text-gray-80">{title}</div>
              ) : null}
            </div>

            {/* right 요소: ex) 음악 toggle 버튼 */}
            <div className="flex items-center justify-end">{right}</div>
          </div>
        </div>
        {/* progress (선택) */}
        {progress ? (
          <div>
            <HeaderProgress value={clamp01(progress.value)} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
