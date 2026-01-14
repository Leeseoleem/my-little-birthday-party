import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import {
  LONG_CANDLE_OPTIONS,
  SHORT_CANDLE_OPTIONS,
  SPECIAL_CANDLE_OPTIONS,
} from "../../../features/creator/data/candleOption.data";
import type { CakeType } from "../../../features/types/cake.types";
import { CAKE_MENU } from "../../../features/creator/data/cakeMenu.data";

import CandleTabSection from "../../../features/creator/components/CandleTabSection";
import { CandleOptionGroup } from "../../../features/creator/components/CandleOptionGroup";
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

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
  component: CreatorCakeBuildPage,
});

function CreatorCakeBuildPage() {
  // params로 넘어온 케이크 값
  const { cakeType } = Route.useParams();
  const selectCake: CakeType = cakeType as CakeType;
  console.log(cakeType);

  const selectCakeMenu = CAKE_MENU.find((m) => {
    return m.type === selectCake;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const handleClose = () => {
    setIsOpen(false);
    setSelectedId(""); // 닫을 때만 초기화
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;

      // 닫히는 순간에만 초기화
      if (prev === true && next === false) {
        setSelectedId("");
      }

      return next;
    });
  };
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex justify-center items-center bg-amber-200">
        <img
          alt={selectCakeMenu?.menuName}
          src={selectCakeMenu?.imageSrc}
          className="block h-full min-h-[200px] max-h-[500px] object-contain drop-shadow-md drop-shadow-black/30 select-none"
        />
      </div>

      {/* 하단 버튼(아래 레이어) */}
      {!isOpen && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <BottomActionSlot>
            <div className="flex w-full justify-center">
              <CommonLinkButton label="완성했어요" to="/creator/guests" />
            </div>
          </BottomActionSlot>
        </div>
      )}

      {/* 하단 패널(위 레이어) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 1) 배경(backdrop): CandleTabSection 제외 영역 클릭 시 닫기 */}
            <motion.button
              type="button"
              className="absolute inset-0 z-10 cursor-default bg-black/20 backdrop-blur-xs"
              aria-label="close overlay"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* 2) 하단 패널 영역 */}
            <motion.div
              className="absolute inset-x-0 bottom-0 z-20"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CandleTabSection
                pages={{
                  long: (
                    <CandleOptionGroup
                      options={LONG_CANDLE_OPTIONS}
                      value={selectedId}
                      onChange={setSelectedId}
                    />
                  ),
                  short: (
                    <CandleOptionGroup
                      options={SHORT_CANDLE_OPTIONS}
                      value={selectedId}
                      onChange={setSelectedId}
                    />
                  ),
                  special: (
                    <CandleOptionGroup
                      options={SPECIAL_CANDLE_OPTIONS}
                      value={selectedId}
                      onChange={setSelectedId}
                    />
                  ),
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
