import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guides/interactive-birthday-card")({
  head: () => ({
    meta: [],
  }),

  component: GuidePage,
});

function GuidePage() {
  return (
    <main>
      <h1>나의 작은 생일 파티: My Little Birthday Party</h1>
    </main>
  );
}
