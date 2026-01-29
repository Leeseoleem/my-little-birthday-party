import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import clsx from "clsx";

import { useBeforeUnloadWarning } from "../../../hooks/useBeforeUnloadWarning";
import { pageLayout } from "../../../components/shared/styles/pageLayout";
import { isCakeType } from "../../../features/creator/utils/isCakeType";

import CakeStackWithSlots from "../../../features/creator/components/build/CakeStackWithSlots";
import CandlePickerSheet from "../../../features/creator/components/build/CandlePickerSheet";
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonButton from "../../../components/ui/Button/Button";
import PageTitle from "../../../components/ui/PageTitle";

import type { CakeType } from "../../../features/types/cake.types";
import type { PlacedCandlesBySlot } from "../../../features/types/cake-doc.types"; // 경로 조정
import { saveCakeDoc } from "../../../lib/api/saveCakeDoc";
import { handleCardError } from "../../../errors/handleCardError"; // 경로 조정

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
  validateSearch: (search) => {
    return {
      cardId: typeof search.cardId === "string" ? search.cardId : undefined,
    };
  },
  beforeLoad: ({ params, search }) => {
    if (!isCakeType(params.cakeType)) {
      throw redirect({ to: "/creator/cake/select", search, replace: true });
    }
  },

  component: CreatorCakeBuildPage,
});

function CreatorCakeBuildPage() {
  const { cakeType } = Route.useParams();
  const { cardId } = Route.useSearch();

  const selectCakeType = cakeType as CakeType;

  const navigate = useNavigate();

  // 촛불 선택 패널
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  // 현재 편집중인 SlotKey
  const [activeSlotKey, setActiveSlotKey] = useState<string | null>(null);

  // 슬롯별 배치 상태 (slotKey -> candleId|null) : DB와 동일 구조
  const [placedBySlot, setPlacedBySlot] = useState<PlacedCandlesBySlot>({});

  const handleSlotClick = (slotKey: string) => {
    setActiveSlotKey(slotKey);
    setIsOpen(true);
  };

  const resetCandlePicker = () => {
    setActiveSlotKey(null);
    setSelectedId("");
    setIsOpen(false);
  };

  const handlePickCandle = (id: string) => {
    setSelectedId(id);

    if (!activeSlotKey) return;

    setPlacedBySlot((prev) => ({
      ...prev,
      [activeSlotKey]: id,
    }));

    resetCandlePicker();
  };

  // 촛불 배치 여부(하나라도 유효하면 true)
  const hasAnyValidPlaced = Object.values(placedBySlot).some(
    (id): id is string => typeof id === "string" && id.length > 0,
  );

  useBeforeUnloadWarning({
    when: hasAnyValidPlaced,
  });

  const onComplete = async () => {
    try {
      await saveCakeDoc(cardId, {
        cakeType: selectCakeType,
        placedCandlesBySlot: placedBySlot,
      });

      if (!cardId) return;

      navigate({
        to: "/creator/complete",
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
    <div
      className={clsx(
        pageLayout,
        "px-4 mdh:px-12 xl:px-25 relative overflow-hidden",
      )}
    >
      <PageTitle
        title="케이크 꾸미기"
        subTitle="케이크에 어울리는 초를 골라주세요"
      />

      <div className="flex-1 flex justify-center items-center px-4">
        <CakeStackWithSlots
          cakeType={selectCakeType}
          placedBySlot={placedBySlot}
          onSlotClick={handleSlotClick}
        />
      </div>

      {!isOpen && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <BottomActionSlot>
            <div className="flex w-full justify-center px-4">
              <CommonButton
                isDisabled={!hasAnyValidPlaced}
                label="완성했어요"
                onClick={onComplete}
              />
            </div>
          </BottomActionSlot>
        </div>
      )}

      <CandlePickerSheet
        isOpen={isOpen}
        onClickBackdrop={resetCandlePicker}
        selectedId={selectedId}
        onPick={handlePickCandle}
      />
    </div>
  );
}
