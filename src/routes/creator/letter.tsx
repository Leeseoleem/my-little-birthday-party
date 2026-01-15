import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useBeforeUnloadWarning } from "../../hooks/useBeforeUnloadWarning";

// --- 기본 컴포넌트 ---
import PageTitle from "../../components/ui/PageTitle";

// --- type: select 모드 컴포넌트 ---
import SelectSection from "../../features/creator/page/letter/SelectSection";

// --- type: write 모드 컴포넌트 ---
import { type LetterPaperType } from "../../features/types/letterPaper.types";
import WriteSection from "../../features/creator/page/letter/WriteSection";

// --- style ---
import { pageLayout } from "../../components/shared/styles/pageLayout";

export const Route = createFileRoute("/creator/letter")({
  staticData: {
    creatorHeader: {
      kind: "progress-exit",
      value: 0.25,
    },
  },
  component: CreatorLetterPage,
});

/** 편지 작성하기 페이지 모드 */
type LetterMode = "select" | "write";

function CreatorLetterPage() {
  const [mode, setMode] = useState<LetterMode>("select");

  const [paperType, setPaperType] = useState<LetterPaperType>("default");
  const [letterText, setLetterText] = useState("");

  // 새로고침 제어 조건
  const shouldWarnOnRefresh = mode === "write" && letterText.trim() !== "";

  useBeforeUnloadWarning({
    when: shouldWarnOnRefresh,
  });

  return (
    <div className={pageLayout}>
      <PageTitle
        title="편지 작성하기"
        subTitle="소중한 사람에게 전하고 싶은 말을 남겨주세요"
      />
      {mode === "select" && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <SelectSection
            type={paperType}
            onTypeChange={(t) => setPaperType(t as LetterPaperType)}
            onItemClick={() => setMode("write")}
          />
        </div>
      )}
      {mode === "write" && (
        <WriteSection
          editor={{
            type: paperType,
            value: letterText,
            onChange: setLetterText,
          }}
          isDisabled={letterText.length < 5}
          onClickText={() => setMode("select")}
        />
      )}
    </div>
  );
}
