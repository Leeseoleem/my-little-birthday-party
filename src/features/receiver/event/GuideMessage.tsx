import { motion } from "framer-motion";
import type { GuideMessageState } from "./types/cakeEventPhase.types";

interface GuideMessageProps {
  state: GuideMessageState;
  children: React.ReactNode;
}

const GuideMessage = ({ state, children }: GuideMessageProps) => {
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
      {children}
    </motion.div>
  );
};

export default GuideMessage;
