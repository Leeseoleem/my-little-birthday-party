import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import clsx from "clsx";

import { useBeforeUnloadWarning } from "../../../hooks/useBeforeUnloadWarning";
import { pageLayout } from "../../../components/shared/styles/pageLayout";
import { isCakeType } from "../../../features/creator/utils/isCakeType";

import CakeStackWithSlots from "../../../features/creator/components/build/CakeStackWithSlots";
import CandlePickerSheet from "../../../features/creator/components/build/CandlePickerSheet";
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";
import PageTitle from "../../../components/ui/PageTitle";
import type { CakeType } from "../../../features/types/cake.types";

export const Route = createFileRoute("/creator/cake/build/$cakeType")({
  staticData: {
    creatorLayout: {
      isFullBleed: true,
    },
    creatorHeader: {
      kind: "progress-exit",
      value: 0.75,
    },
  },
  beforeLoad: ({ params }) => {
    if (!isCakeType(params.cakeType)) {
      throw redirect({ to: "/creator/cake/select", replace: true });
    }
  },
  component: CreatorCakeBuildPage,
});

function CreatorCakeBuildPage() {
  // params로 넘어온 케이크 값
  const { cakeType } = Route.useParams();

  const selectCakeType = cakeType as CakeType;

  // 촛불 선택 영역 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  // 현재 편집중인 Slot
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 슬롯별 배치 상태 (index -> candleId)
  const [placedIds, setPlacedIds] = useState<
    Record<number, string | undefined>
  >({});

  const handleSlotClick = (index: number) => {
    setActiveIndex(index);
    // 여기서 하단 촛불 선택 메뉴 열기
    setIsOpen(true);
  };

  const resetCandlePicker = () => {
    setActiveIndex(null);
    setSelectedId("");
    setIsOpen(false);
  };

  const handlePickCandle = (id: string) => {
    setSelectedId(id);

    // 어떤 슬롯을 골랐는지 알아야 배치가 가능
    if (activeIndex === null) return;

    setPlacedIds((prev) => ({
      ...prev,
      [activeIndex]: id,
    }));

    resetCandlePicker();
  };

  // 촛불 배치 여부
  const hasAnyValidPlaced = Object.values(placedIds).some(
    (id): id is string => typeof id === "string" && id.length > 0
  );

  // 새로고침 제어 조건
  const shouldWarnOnRefresh = hasAnyValidPlaced;

  useBeforeUnloadWarning({
    when: shouldWarnOnRefresh,
  });

  return (
    <div
      className={clsx(
        pageLayout,
        "px-4 mdh:px-12 xl:px-25 relative overflow-hidden"
      )}
    >
      <PageTitle
        title="케이크 꾸미기"
        subTitle="케이크에 어울리는 초를 골라주세요"
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex justify-center items-center px-4">
        <CakeStackWithSlots
          cakeType={selectCakeType}
          placedIds={placedIds}
          onSlotClick={handleSlotClick}
        />
      </div>

      {/* 하단 버튼(아래 레이어) */}
      {!isOpen && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <BottomActionSlot>
            <div className="flex w-full justify-center">
              <CommonLinkButton
                isDisabled={!hasAnyValidPlaced}
                label="완성했어요"
                to="/creator/guests"
              />
            </div>
          </BottomActionSlot>
        </div>
      )}

      {/* 하단 패널 영역 */}
      <CandlePickerSheet
        isOpen={isOpen}
        onClickBackdrop={resetCandlePicker}
        selectedId={selectedId}
        onPick={handlePickCandle}
      />
    </div>
  );
}
