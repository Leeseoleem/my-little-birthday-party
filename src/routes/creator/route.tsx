import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router";
import clsx from "clsx";
import AppHeader from "../../components/ui/Header/AppHeader";
import { BackButton } from "../../components/ui/Header/BackButton";

export const Route = createFileRoute("/creator")({
  component: CreatorLayout,
});

function CreatorLayout() {
  // 현재 URL에 매칭된 모든 라우트 배열
  const matches = useMatches();

  const leaf = matches[matches.length - 1];
  // 헤더 메타 데이터를 설치한 라우트
  const headerMeta = leaf.staticData?.creatorHeader;
  // 레이아웃 메타 데이터를 설치한 라우트
  const LayoutMeta = leaf.staticData?.creatorLayout;

  const layoutClass = clsx(
    "flex flex-1 flex-col min-h-0",
    !LayoutMeta && "px-4 md:px-12 xl:px-25"
  );

  return (
    // /creator 구간 공통 레이아웃 (헤더/컨테이너/배경 등)
    <div className="h-dvh flex flex-col">
      {/* Header: 풀폭(패딩 없음) */}
      <header className="w-full">
        {headerMeta && (
          <AppHeader
            progress={{ value: headerMeta.value }}
            left={<BackButton fallbackTo={headerMeta.fallbackTo} />}
          />
        )}
      </header>

      {/* Main: 여기만 패딩 적용 */}
      <main className={layoutClass}>
        <Outlet />
      </main>

      {/* Footer: 풀폭(패딩 없음) */}
      <footer className="w-full">
        {/* 예: <BottomCTA container /> 처럼 내부에서만 패딩/정렬 처리 */}
        {/* <BottomCTA /> */}
      </footer>
    </div>
  );
}
