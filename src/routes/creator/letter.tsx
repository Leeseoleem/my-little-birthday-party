import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useBeforeUnloadWarning } from "../../hooks/useBeforeUnloadWarning";

// --- doc 관련 ---
import { saveLetterDoc } from "../../lib/api/creator/saveLetterDoc";
import { handleCardError } from "../../errors/handleCardError";
import type { LetterDoc } from "../../features/types/letterPaper.types";

// --- 기본 컴포넌트 ---
import PageTitle from "../../components/ui/PageTitle";

// --- type: select 모드 컴포넌트 ---
import SelectSection from "../../features/creator/components/letter/sections/SelectSection";

// --- type: write 모드 컴포넌트 ---
import { type LetterPaperType } from "../../features/types/letterPaper.types";
import WriteSection from "../../features/creator/components/letter/sections/WriteSection";

// --- style ---
import { pageLayout } from "../../components/shared/styles/pageLayout";

export const Route = createFileRoute("/creator/letter")({
  staticData: {
    creatorHeader: {
      kind: "progress-exit",
      value: 0.25,
    },
  },
  validateSearch: (search) => {
    return {
      cardId: typeof search.cardId === "string" ? search.cardId : undefined,
    };
  },
  component: CreatorLetterPage,
});

/** 편지 작성하기 페이지 모드 */
type LetterMode = "select" | "write";

function CreatorLetterPage() {
  const navigate = useNavigate();
  const { cardId } = Route.useSearch();

  const [mode, setMode] = useState<LetterMode>("select");

  const [paperType, setPaperType] = useState<LetterPaperType>("default");
  const [letterText, setLetterText] = useState("");

  // 새로고침 제어 조건
  const shouldWarnOnRefresh = mode === "write" && letterText.trim() !== "";

  useBeforeUnloadWarning({
    when: shouldWarnOnRefresh,
  });

  const onSave = async (doc: LetterDoc) => {
    try {
      await saveLetterDoc(cardId, doc); // cardId는 바깥 scope
      if (!cardId) return;

      navigate({
        to: "/creator/cake/select",
        search: { cardId },
        replace: true,
      });
    } catch (err) {
      const handled = handleCardError(err, navigate);
      if (handled) return;
      alert("저장 중 오류가 발생했습니다.");
    }
  };

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
        <div className="flex-1 min-h-0 overflow-hidden">
          <WriteSection
            editor={{
              type: paperType,
              value: letterText,
              onChange: setLetterText,
            }}
            onClickText={() => setMode("select")}
            buttonProps={{
              label: "작성 완료하기",
              isDisabled: letterText.trim().length < 5,
              onClick: () => {
                void onSave({
                  paperType: paperType,
                  content: letterText,
                });
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
