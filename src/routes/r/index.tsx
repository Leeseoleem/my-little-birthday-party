import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/r/")({
  beforeLoad: () => {
    // /r 는 cardId 없이 접근하면 안내 페이지로 이동
    throw redirect({ to: "/r/expired" });
  },
});
