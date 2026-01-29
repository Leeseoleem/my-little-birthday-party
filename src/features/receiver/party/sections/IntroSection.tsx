import { motion } from "framer-motion";

import GuideMessage from "../../event/GuideMessage";

export default function IntroSection({ duration }: { duration: number }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration, ease: "easeOut" }}
    >
      <GuideMessage state="show">
        🎉 준비된 생일 이벤트는 여기까지예요.
        <br />
        이 파티는 언제든 다시 찾아오실 수 있어요.
        <br />
        편하게 즐겨주세요!
      </GuideMessage>
    </motion.div>
  );
}
