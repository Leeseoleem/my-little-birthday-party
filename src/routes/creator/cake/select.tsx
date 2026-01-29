import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import type { CakeType } from "../../../features/types/cake.types";

import PageTitle from "../../../components/ui/PageTitle";
import CakeSelectSection from "../../../features/creator/components/cake-select/sections/CakeSelectSection";

export const Route = createFileRoute("/creator/cake/select")({
  staticData: {
    creatorHeader: {
      kind: "progress-exit",
      value: 0.5,
    },
  },
  validateSearch: (search) => {
    return {
      cardId: typeof search.cardId === "string" ? search.cardId : undefined,
    };
  },
  component: CreatorCakeSelectPage,
});

function CreatorCakeSelectPage() {
  const { cardId } = Route.useSearch();

  const [cakeType, setCakeType] = useState<CakeType>("party");
  return (
    <div className="flex flex-col h-full pt-4">
      <PageTitle
        title="케이크 선택하기"
        subTitle="마음에 드는 케이크를 골라주세요"
      />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <CakeSelectSection
          type={cakeType}
          onTypeChange={(type) => setCakeType(type)}
          buttonProps={{
            to: "/creator/cake/build/$cakeType",
            params: { cakeType: cakeType },
            search: { cardId },
            replace: true,
          }}
        />
      </div>
    </div>
  );
}
