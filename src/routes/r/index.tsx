import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/r/")({
  beforeLoad: () => {
    // /r 는 cardId 없이 접근하면 의미가 없으므로 루트로 돌립니다.
    // 필요하면 404 페이지로 보내는 방식으로 바꿀 수 있습니다.
    throw redirect({ to: "/" });
  },
});
