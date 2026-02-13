import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

// === component ===
import GarlandLayout from "../../components/layout/page/GarlandLayout";
import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";
import { AppHeader, BackButton } from "../../components/ui/Header";
import GuideSlideLayout from "../../features/creator/components/guide/GuideSlideLayout";

// === content ===
import { GUIDE_SLIDES } from "../../features/creator/components/guide/guideSlide.config";

export const Route = createFileRoute("/guides/interactive-birthday-card")({
  head: () => ({
    meta: [
      {
        title: "나의 작은 생일 파티 | 케이크 이벤트로 생일 카드 만들기",
      },
      {
        name: "description",
        content:
          "단순한 축하 메시지가 아닌, 케이크 → 촛불 끄기 → 편지로 이어지는 인터랙티브 생일 카드 제작 방법과 사용자 경험 흐름을 정리했습니다.",
      },
      { property: "og:type", content: "article" },
    ],
  }),

  component: GuidePage,
});

function GuidePage() {
  const [index, setIndex] = useState(0);

  const total = GUIDE_SLIDES.length;

  const canPrev = index > 0;
  const canNext = index < total - 1;
  const current = GUIDE_SLIDES[index];

  const handlePrev = () => {
    if (!canPrev) return;
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canNext) return;
    setIndex((prev) => prev + 1);
  };

  return (
    <main>
      <GarlandLayout hasHeader>
        <EnvelopeLayout />
        <div className="flex min-h-dvh flex-col">
          <AppHeader left={<BackButton />} />

          <div className="flex flex-1 justify-center items-center px-4">
            <GuideSlideLayout
              header={{
                title: current.header.title,
                subTitle: current.header.subTitle,
              }}
              bodyTitle={current.bodyTitle}
              prevButton={{
                disabled: !canPrev,
                onClick: handlePrev,
              }}
              nextButton={{
                disabled: !canNext,
                onClick: handleNext,
              }}
            >
              <div className="flex-1 min-h-0 overflow-y-auto">
                {current.content}
              </div>
            </GuideSlideLayout>
          </div>
        </div>
      </GarlandLayout>
    </main>
  );
}
