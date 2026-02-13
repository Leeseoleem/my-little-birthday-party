import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getSiteOrigin } from "../../utils/getSiteOrigin";

// === component ===
import GarlandLayout from "../../components/layout/page/GarlandLayout";
import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";
import { AppHeader, BackButton } from "../../components/ui/Header";
import GuideSlideLayout from "../../features/creator/components/guide/GuideSlideLayout";

// === content ===
import { GUIDE_SLIDES } from "../../features/creator/components/guide/guideSlide.config";

export const Route = createFileRoute("/guides/interactive-birthday-card")({
  head: () => {
    const origin = getSiteOrigin();
    const path = "/guides/interactive-birthday-card";

    const url = new URL(path, origin).toString();
    const title = "인터랙티브 생일 카드 만드는 법 | 나의 작은 생일 파티";
    const description =
      "케이크를 꾸미고 초를 끄는 이벤트로 편지를 전하는 인터랙티브 생일 카드 제작 흐름을 정리했습니다.";

    // JSON-LD (Article) 구성
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      mainEntityOfPage: url,
      author: {
        "@type": "Person",
        name: "Leeseoleem",
      },
      publisher: {
        "@type": "Organization",
        name: "나의 작은 생일 파티",
      },
    };

    return {
      title,
      meta: [
        { name: "description", content: description },

        {
          name: "robots",
          content:
            "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
        },

        // 언어/지역 타겟 힌트
        { name: "language", content: "ko" },
      ],
      links: [
        // 대표 URL 고정
        { rel: "canonical", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },

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
              {current.content}
            </GuideSlideLayout>
          </div>
        </div>
      </GarlandLayout>
    </main>
  );
}
