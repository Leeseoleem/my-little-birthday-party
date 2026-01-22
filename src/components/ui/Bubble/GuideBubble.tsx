import { motion } from "framer-motion";
import clsx from "clsx";

interface TextBubbleProps {
  message: string;
}

const GuideBubble = ({ message }: TextBubbleProps) => {
  return (
    // 꼬리(absolute)를 붙이려면 부모가 relative여야 함
    <motion.div
      className="relative inline-flex will-change-transform"
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
      }}
    >
      {/* ▲ 위쪽 삼각형 */}
      <div
        className={clsx(
          "absolute left-1/2 -translate-x-1/2",
          // 버블 위에 붙이기
          "top-1 -translate-y-full",
          // 크기
          "h-3 w-4",
          // 색상
          "bg-gray-0",
          // 위를 향한 삼각형
          "[clip-path:polygon(50%_0,0_100%,100%_100%)]",
        )}
      />

      {/* 버블 본체 */}
      <div className="flex py-3 px-4 min-w-0 max-w-[300px] bg-gray-0 items-center shadow-bubble rounded-2xl">
        <p className="text-display-03 text-[14px] mdh:text-[16px] lgh:text-[18px] text-main-active wrap-break-words">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default GuideBubble;
