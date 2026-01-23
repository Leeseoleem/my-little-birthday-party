import { motion } from "framer-motion";

interface ShakingEnvelopeProps {
  src?: string;
  onClick: () => void;
}

const ShakingEnvelope = ({
  src = "/assets/envelopes/letter-envelope-close.png",
  onClick,
}: ShakingEnvelopeProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative select-none"
      style={{ touchAction: "manipulation" }}
      whileTap={{ scale: 0.96 }} // 눌림 피드백
      transition={{ duration: 0.08, ease: "easeOut" }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: [0, -3, 3, -2, 2, 0],
        }}
        transition={{
          duration: 0.6, // 흔들리는 시간
          ease: "easeInOut",
          repeat: Infinity, // 무한 반복
          repeatDelay: 1.8, // 멈춰있는 시간
        }}
        style={{ transformOrigin: "50% 60%" }}
      >
        <img
          src={src}
          alt="closed envelope"
          draggable={false}
          className="w-full max-w-[520px] h-auto pointer-events-none"
        />
      </motion.div>
    </motion.button>
  );
};

export default ShakingEnvelope;
