import { motion } from "framer-motion";
import type { GuideMessageState } from "./types/cakeEventPhase.types";

const GuideMessage = ({ state }: { state: GuideMessageState }) => {
  // hidden이면 렌더링 하지 않음
  if (state === "hidden") return null;

  const fadeOutDurationSec = 0.4;

  return (
    <motion.div
      className="text-small mdh:text-body lgh:text-sub-title text-gray-0 text-center z-50"
      aria-hidden
      initial={false}
      animate={{ opacity: state === "fadeOut" ? 0 : 1 }}
      transition={
        state === "fadeOut"
          ? { duration: fadeOutDurationSec, ease: "easeOut" }
          : { duration: 0 }
      }
    >
      🎧 잠시 후 음악이 재생됩니다.
      <br />
      이어폰을 착용하면 더 깊이 즐길 수 있어요.
    </motion.div>
  );
};

export default GuideMessage;
