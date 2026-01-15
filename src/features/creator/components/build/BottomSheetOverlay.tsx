import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type BottomSheetOverlayProps = {
  isOpen: boolean;
  onClickBackdrop: () => void;

  children: React.ReactNode;
};

export default function BottomSheetOverlay({
  isOpen,
  onClickBackdrop,
  children,
}: BottomSheetOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경(backdrop): CandleTabSection 제외 영역 클릭 시 닫기 */}
          <motion.button
            type="button"
            className="absolute inset-0 z-10 cursor-default bg-black/20 backdrop-blur-xs"
            aria-label="close overlay"
            onClick={onClickBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* 하단 패널 영역 */}
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
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
