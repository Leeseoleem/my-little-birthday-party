import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/creator")({
  component: CreatorLayout,
});

function CreatorLayout() {
  return (
    // /creator 구간 공통 레이아웃 (헤더/컨테이너/배경 등)
    <div className="min-h-dvh flex flex-col">
      {/* Header: 풀폭(패딩 없음) */}
      <header className="w-full">
        {/* 예: <AppHeader container /> 처럼 내부에서만 패딩/정렬 처리 */}
        {/* <AppHeader ... /> */}
      </header>

      {/* Main: 여기만 패딩 적용 */}
      <main className="flex flex-1 flex-col px-4 md:px-12 lg:px-25">
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
