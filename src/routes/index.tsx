import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";

const TEST_CARD_ID = "dev-card";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (import.meta.env.DEV) return;
    // 배포 환경에서는 "/" 로 접근 시 항상 "/creator"로 이동
    throw redirect({ to: "/creator" });
  },
  component: DevHub,
});

function DevHub() {
  const navigate = useNavigate();

  const goReceiver = () => {
    // 수신자 진입점: /r/$cardId (index)
    navigate({
      to: "/r/$cardId",
      params: { cardId: TEST_CARD_ID },
    });
  };
  return (
    <div>
      {/* 제작자 시작 */}
      <section className="space-y-2">
        <Link
          to="/creator"
          className="inline-block rounded-lg border border-gray-20 px-4 py-2 text-body text-gray-80"
        >
          /creator (C1)
        </Link>
      </section>
      {/* 수신자 차단 확인 */}
      <section className="space-y-2">
        <Link
          to="/r"
          className="inline-block rounded-lg border border-gray-20 px-4 py-2 text-body text-gray-80"
        >
          /r (차단 확인)
        </Link>
      </section>
      {/* 수신자 이벤트 시작 */}
      <section className="space-y-2">
        <button
          type="button"
          onClick={goReceiver}
          className="h-12 rounded-lg bg-gray-90 px-4 text-body text-gray-80"
        >
          /r/{`{cardId}`}
        </button>
      </section>
    </div>
  );
}
