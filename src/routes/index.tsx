import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      <p className="text-letter-base">폰트 스타일 확인용</p>
      <p className="text-letter-night">폰트 스타일 확인용</p>
      <p className="text-letter-system">폰트 스타일 확인용</p>
      <p className="text-letter-base-mobile">폰트 스타일 확인용</p>
      <p className="text-letter-night-mobile">폰트 스타일 확인용</p>
      <p className="text-letter-system-mobile">폰트 스타일 확인용</p>
    </div>
  );
}
