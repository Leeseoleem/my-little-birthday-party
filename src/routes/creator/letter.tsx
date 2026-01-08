import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import CreatorLetterEditor from "../../features/creator/components/CreatorLetterEditor";
import {
  type LetterPaperType,
  LETTER_PAPER_ITEMS,
} from "../../features/types/letterPaper.types";

import PageTitle from "../../components/ui/PageTitle";
import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/letter")({
  staticData: {
    creatorHeader: {
      value: 0.4,
      fallbackTo: "/creator/info",
    },
  },
  component: CreatorLetterPage,
});

function CreatorLetterPage() {
  const [value, setValue] = useState("");
  const [paperType, setPaperType] = useState<LetterPaperType>("default");

  return (
    <div className="flex flex-col h-full pt-4">
      <PageTitle
        title="편지 작성하기"
        subTitle="소중한 사람에게 전하고 싶은 말을 남겨주세요"
      />
      {/* 추후 사용될 내용
      <div className="flex flex-1 max-h-full overflow-hidden">
        <CarouselLayout
          items={LETTER_PAPER_ITEMS}
          type={paperType}
          onTypeChange={(type) => setPaperType(type as LetterPaperType)}
        />
      </div> */}
      <CreatorLetterEditor type="default" value={value} onChange={setValue} />
      <BottomActionSlot>
        <CommonLinkButton
          label="4. 케이크 선택으로"
          to={"/creator/cake/select"}
        />
      </BottomActionSlot>
    </div>
  );
}
