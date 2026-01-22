import { AnimatePresence, motion } from "framer-motion";

type FlameProps = {
  isOn: boolean;
  size: number; // px (불꽃 원 지름)
  top: number; // px (불꽃 원 top)
};

const Flame = ({ isOn, size, top }: FlameProps) => {
  const glowSize = size * 1.25;
  return (
    <>
      {/* 불꽃: isOn일 때만 렌더, 꺼질 때 빠르게 축소 후 사라짐 */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            key="flame"
            animate={{
              opacity: 1,
              scale: [1, 1.3, 1], // 천천히 펄스
              animation: Infinity,
            }}
            exit={{
              opacity: 0,
              scale: 0.1, // 꺼질 때 빠르게 쪼그라듦
              transition: { duration: 0.18, ease: "easeOut" },
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: "50%",
              top,
              transform: "translateX(-50%)",
              width: size,
              height: size,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {/* glow(외곽 흐림) */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: glowSize,
                height: glowSize,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,159,28,0.30) 0%, rgba(255,159,28,0.14) 45%, rgba(255,159,28,0.00) 78%)",
                filter: "blur(10px)",
              }}
            />

            {/* core(중심) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,241,179,0.95) 0%, rgba(255,183,77,0.65) 40%, rgba(255,159,28,0.30) 62%, rgba(255,215,154,0.00) 78%)",
                filter: "blur(2px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 연기: 불꽃이 꺼질 때(= smokeKey 증가) 1회 나타났다 사라짐 */}
      <AnimatePresence>
        {!isOn && (
          <motion.div
            key="smokeKey"
            initial={{ opacity: 0.35, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, y: -16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top,
              transform: "translateX(-50%)",
              width: size * 0.9,
              height: size * 0.9,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(70,70,70,0.30) 0%, rgba(50,50,50,0.12) 55%, rgba(0,0,0,0) 80%)",
              filter: "blur(7px)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Flame;
