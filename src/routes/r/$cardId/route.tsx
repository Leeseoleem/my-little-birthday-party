import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * TODO(구조 분리 계획):
 * - type ReceiverBgmKey = "none" | "event" | "letter" | "party";
 *   features/audio/core + receiver + creator 구조로 정리
 */

/**
 * TODO(확장):
 * - letter 페이지는 편지지/테마(letterTheme)에 따라 BGM이 달라질 예정
 * - 실제 구현 시:
 *   1) card 데이터 로드 (예: loader에서 조회)
 *   2) card.letterTheme 기반으로 letter 트랙 src 결정
 *   3) resolveReceiverBgmSrc( key, card ) 형태로 분기 로직을 분리
 */

export const Route = createFileRoute("/r/$cardId")({
  component: ReceiverLayout,
});

function ReceiverLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* TODO(audio):
          - 수신자 플로우(event/letter/party) UI 확정 후,
            이 레이아웃에서 전역 오디오 플레이어를 유지하고
            페이지별 트랙 전환 정책을 적용합니다.
          - 후보 구조:
            src/features/audio/core + receiver + creator */}
      <header className="w-full" />
      {/* Main: 수신자 연출 화면이 많아 레이아웃에서 패딩을 강제하지 않습니다 */}
      <main className="flex flex-1 w-full">
        <Outlet />
      </main>
      {/* Footer: 풀폭(패딩 없음) - 필요 없으면 비워둠 */}
      <footer className="w-full" />
    </div>
  );
}
